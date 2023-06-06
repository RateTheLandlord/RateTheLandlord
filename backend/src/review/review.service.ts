import { DatabaseService } from 'src/database/database.service';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { IStats, Review, ReviewsResponse } from './models/review';
import { IResult, filterReviewWithAI } from './helpers';

type ReviewQuery = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: 'az' | 'za' | 'new' | 'old';
  state?: string;
  country?: string;
  city?: string;
  zip?: string;
};

@Injectable()
export class ReviewService {
  constructor(private readonly databaseService: DatabaseService) { }

  public async editDistance(string1, string2) {
    string1 = string1.toLowerCase();
    string2 = string2.toLowerCase();
    var costs = new Array();
    for (var i = 0; i <= string1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= string2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (string1.charAt(i - 1) != string2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[string2.length] = lastValue;
    }
    return costs[string2.length];
  }

  // https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
  public async reviewSimilarity(review1: string, review2: string) {
    var longer: string = review1;
    var shorter: string = review2;
    if (review1.length < review2.length) {
      longer = review2;
      shorter = review1;
    }
    var longerLength: number = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength.toString());
  }

  private async checkRreviewsForSimilarity(
    reviewsFromDbForThatUser: Review[], 
    reviewUserSubmitted: string
  ) {
    for (let review of reviewsFromDbForThatUser) {
      const similarityScore: number = this.reviewSimilarity(review.review, reviewUserSubmitted);
      if (similarityScore > 0.7) {
        return true;
      }
    }
    return false;
  }

  private async getExistingRevewsForUser(inputReview: Review): Promise<Review[]> {
    try {
      const existingReview: Review[] = await this.databaseService.sql<Review[]>
      `SELECT REVIEW FROM review WHERE landlord = ${inputReview.landlord} AND ZIP = ${inputReview.zip};`;
      return existingReview;
    } catch (e) {
      throw new InternalServerErrorException('Failed to retrieve existing reviews from the database');
    }
  }

  public async get(params: ReviewQuery): Promise<ReviewsResponse> {
    const {
      page: pageParam,
      limit: limitParam,
      search,
      sort,
      state,
      country,
      city,
      zip,
    } = params;

    const page = pageParam ? pageParam : 1;
    const limit = limitParam ? limitParam : 25;

    const offset = (page - 1) * limit;

    const sql = this.databaseService.sql;

    let orderBy = sql`id`;
    if (sort === 'az' || sort === 'za') {
      orderBy = sql`landlord`;
    } else if (sort === 'new' || sort === 'old') {
      orderBy = sql`date_added`;
    }

    const sortOrder = sort === 'az' || sort === 'old' ? sql`ASC` : sql`DESC`;

    const searchClause =
      search?.length > 0
        ? sql`AND (landlord ILIKE ${'%' + search + '%'})`
        : sql``;

    const stateClause = state ? sql`AND state = ${state.toUpperCase()}` : sql``;
    const countryClause = country
      ? sql`AND country_code = ${country.toUpperCase()}`
      : sql``;
    const cityClause = city ? sql`AND city = ${city.toUpperCase()}` : sql``;
    const zipClause = zip ? sql`AND zip = ${zip.toUpperCase()}` : sql``;

    // Fetch reviews
    const reviews = (await sql`
      SELECT * FROM review WHERE 1=1 ${searchClause} ${stateClause} ${countryClause} ${cityClause} ${zipClause}
      ORDER BY ${orderBy} ${sortOrder} LIMIT ${limit}
      OFFSET ${offset}
    `) as any;

    // Fetch total number of reviews
    const totalResult = await sql`
      SELECT COUNT(*) as count FROM review WHERE 1=1 ${searchClause} ${stateClause} ${countryClause} ${cityClause} ${zipClause}
    `;
    const total = totalResult[0].count;

    // Fetch countries
    const countries = await sql`
      SELECT DISTINCT country_code FROM review;
    `;
    const countryList = countries.map(({ country_code }) => country_code);

    // Fetch states
    const states = await sql`
      SELECT DISTINCT state FROM review WHERE 1=1 ${countryClause};
    `;
    const stateList = states.map(({ state }) => state);

    // Fetch cities
    const cities = await sql`
      SELECT DISTINCT city FROM review WHERE 1=1 ${countryClause} ${stateClause};
    `;
    const cityList = cities.map(({ city }) => city);

    // Fetch zips
    const zips = await sql`
      SELECT DISTINCT zip FROM review WHERE 1=1 ${countryClause} ${stateClause} ${cityClause};
    `;
    const zipList = zips.map(({ zip }) => zip);

    // Return ReviewsResponse object
    return {
      reviews,
      total,
      countries: countryList,
      states: stateList,
      cities: cityList,
      zips: zipList,
      limit: limit,
    };
  }

  public findOne(id: number): Promise<Review[]> {
    return this.databaseService.sql<
      Review[]
    >`Select * FROM review WHERE id IN(${id});`;
  }

  public async create(inputReview: Review): Promise<Review> {
    try {
      const filterResult: IResult = await filterReviewWithAI(inputReview);
  
      // Check existing reviews for that landlord, if we detect the new review matches any existing ones by 75%
      const existingReviews: Review[] = await this.getExistingRevewsForUser(inputReview);
      const reviewSpamDetected: boolean = await this.checkRreviewsForSimilarity(existingReviews, inputReview.review);
      if (reviewSpamDetected) {
        throw new BadRequestException('Too many reviews for this landlord!');
      }
  
      inputReview.landlord = inputReview.landlord
        .substring(0, 150)
        .toLocaleUpperCase();
      inputReview.country_code = inputReview.country_code.toLocaleUpperCase();
      inputReview.city = inputReview.city.substring(0, 150).toLocaleUpperCase();
      inputReview.state = inputReview.state.toLocaleUpperCase();
      inputReview.zip = inputReview.zip.substring(0, 50).toLocaleUpperCase();
      inputReview.admin_approved = null;
      inputReview.flagged = filterResult.flagged;
      inputReview.flagged_reason = filterResult.flagged_reason;
  
      const id = (
        await this.databaseService.sql<{ id: number }[]>`
          INSERT INTO review 
            (landlord, country_code, city, state, zip, review, repair, health, stability, privacy, respect, flagged, flagged_reason, admin_approved, admin_edited) 
          VALUES (${inputReview.landlord}, ${inputReview.country_code}, ${inputReview.city}, ${inputReview.state}, ${inputReview.zip}, ${inputReview.review}, ${inputReview.repair}, ${inputReview.health}, ${inputReview.stability}, ${inputReview.privacy}, ${inputReview.respect}, ${inputReview.flagged}, ${inputReview.flagged_reason}, ${inputReview.admin_approved}, ${inputReview.admin_edited}) 
          RETURNING id;`
      )[0].id;
  
      inputReview.id = id;
      return inputReview;
    } catch (e) {
      throw e;
    }
  }

  public async update(id: number, review: Review): Promise<Review> {
    await this.databaseService
      .sql`UPDATE review SET landlord = ${review.landlord}, country_code = ${review.country_code}, city = ${review.city}, state = ${review.state}, zip = ${review.zip}, review = ${review.review}, repair = ${review.repair}, health = ${review.health}, stability = ${review.stability}, privacy = ${review.privacy}, respect = ${review.respect}, flagged = ${review.flagged}, flagged_reason = ${review.flagged_reason}, admin_approved = ${review.admin_approved}, admin_edited = ${review.admin_edited} 
      WHERE id = ${id};`;

    return review;
  }

  public async report(id: number, reason: string): Promise<number> {
    reason.length > 250
      ? (reason = `${reason.substring(0, 250)}...`)
      : (reason = reason);
    await this.databaseService
      .sql`UPDATE review SET flagged = true, flagged_reason = ${reason}
      WHERE id = ${id};`;

    return id;
  }

  public async delete(id: number): Promise<boolean> {
    await this.databaseService.sql`DELETE FROM review WHERE ID = ${id};`;

    return true;
  }

  public async getFlagged(): Promise<Review[]> {
    return await this.databaseService.sql<
      Review[]
    >`SELECT * FROM review WHERE flagged = true;`;
  }

  public async getStats(): Promise<IStats> {
    const sql = this.databaseService.sql;

    const totalResult = await sql`
      SELECT COUNT(*) as count FROM review
    `;
    const total_reviews = totalResult[0].count;

    const totalCA =
      await sql`SELECT COUNT(*) as count FROM review WHERE country_code = 'CA'`;
    const total_ca_reviews = totalCA[0].count;

    const ca_states = await sql`
      SELECT DISTINCT state FROM review WHERE country_code = 'CA';
    `;
    const ca_states_list = ca_states.map(({ state }) => state);

    const ca_total_for_states = [];

    for (let i = 0; i < ca_states_list.length; i++) {
      const key = ca_states_list[i];
      const total =
        await sql`SELECT COUNT(*) as count FROM review WHERE state = ${ca_states_list[i]}`;
      ca_total_for_states.push({ key: key, total: total[0].count });
    }

    const totalUS =
      await sql`SELECT COUNT(*) as count FROM review WHERE country_code = 'US'`;
    const total_us_reviews = totalUS[0].count;

    const us_states = await sql`
      SELECT DISTINCT state FROM review WHERE country_code = 'US';
    `;
    const us_states_list = us_states.map(({ state }) => state);

    const us_total_for_states = [];

    for (let i = 0; i < us_states_list.length; i++) {
      const key = us_states_list[i];
      const total =
        await sql`SELECT COUNT(*) as count FROM review WHERE state = ${us_states_list[i]}`;
      us_total_for_states.push({ key: key, total: total[0].count });
    }

    const totalUK =
      await sql`SELECT COUNT(*) as count FROM review WHERE country_code = 'GB'`;
    const total_uk_reviews = totalUK[0].count;

    const uk_states = await sql`
      SELECT DISTINCT state FROM review WHERE country_code = 'GB';
    `;
    const uk_states_list = uk_states.map(({ state }) => state);

    const uk_total_for_states = [];

    for (let i = 0; i < uk_states_list.length; i++) {
      const key = uk_states_list[i];
      const total =
        await sql`SELECT COUNT(*) as count FROM review WHERE state = ${uk_states_list[i]}`;
      uk_total_for_states.push({ key: key, total: total[0].count });
    }

    const totalAU =
      await sql`SELECT COUNT(*) as count FROM review WHERE country_code = 'AU'`;
    const total_au_reviews = totalAU[0].count;

    const au_states = await sql`
      SELECT DISTINCT state FROM review WHERE country_code = 'AU';
    `;
    const au_states_list = au_states.map(({ state }) => state);

    const au_total_for_states = [];

    for (let i = 0; i < au_states_list.length; i++) {
      const key = au_states_list[i];
      const total =
        await sql`SELECT COUNT(*) as count FROM review WHERE state = ${au_states_list[i]}`;
      au_total_for_states.push({ key: key, total: total[0].count });
    }

    const totalNZ =
      await sql`SELECT COUNT(*) as count FROM review WHERE country_code = 'NZ'`;
    const total_nz_reviews = totalNZ[0].count;

    const nz_states = await sql`
      SELECT DISTINCT state FROM review WHERE country_code = 'NZ';
    `;
    const nz_states_list = nz_states.map(({ state }) => state);

    const nz_total_for_states = [];

    for (let i = 0; i < nz_states_list.length; i++) {
      const key = nz_states_list[i];
      const total =
        await sql`SELECT COUNT(*) as count FROM review WHERE state = ${nz_states_list[i]}`;
      nz_total_for_states.push({ key: key, total: total[0].count });
    }

    return {
      total_reviews: total_reviews,
      total_ca_reviews: {
        total: total_ca_reviews,
        states: ca_total_for_states,
      },
      total_au_reviews: {
        total: total_au_reviews,
        states: au_total_for_states,
      },
      total_uk_reviews: {
        total: total_uk_reviews,
        states: uk_total_for_states,
      },
      total_us_reviews: {
        total: total_us_reviews,
        states: us_total_for_states,
      },
      total_nz_reviews: {
        total: total_nz_reviews,
        states: nz_total_for_states,
      },
    };
  }

  public async getLandlords(): Promise<string[]> {
    const landlords = await this.databaseService
      .sql`SELECT DISTINCT landlord FROM review;`;
    const landlordList = landlords.map(({ landlord }) => landlord);

    return landlordList;
  }

  public async getLandlordReviews(landlord: string): Promise<Review[]> {
    landlord = decodeURIComponent(landlord);

    return this.databaseService.sql<
      Review[]
    >`Select * FROM review WHERE landlord IN(${landlord});`;
  }
}
