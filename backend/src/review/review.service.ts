import { DatabaseService } from "src/database/database.service";
import { Injectable } from "@nestjs/common";
import { IStats, Review, ReviewsResponse } from "./models/review";
import { filterReviewWithAI, IResult } from "./helpers";
import { ReviewSimilarityService } from "./review-text-match";
import { ReviewModel } from "./models/review-data-layer";

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
  constructor(
    private readonly databaseService: DatabaseService,
    private reviewSimilarityService: ReviewSimilarityService,
    private reviewDataLayerService: ReviewModel,
  ) {}

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
        ? sql`AND (landlord ILIKE
              ${'%' + search + '%'}
              )`
        : sql``;

    const stateClause = state
      ? sql`AND state =
    ${state.toUpperCase()}`
      : sql``;
    const countryClause = country
      ? sql`AND country_code =
            ${country.toUpperCase()}`
      : sql``;
    const cityClause = city
      ? sql`AND city =
    ${city.toUpperCase()}`
      : sql``;
    const zipClause = zip
      ? sql`AND zip =
    ${zip.toUpperCase()}`
      : sql``;

    // Fetch reviews
    const reviews = (await sql`
        SELECT *
        FROM review
        WHERE 1 = 1 ${searchClause} ${stateClause} ${countryClause} ${cityClause} ${zipClause}
        ORDER BY ${orderBy} ${sortOrder} LIMIT ${limit}
        OFFSET ${offset}
    `) as any;

    // Fetch total number of reviews
    const totalResult = await sql`
        SELECT COUNT(*) as count
        FROM review
        WHERE 1=1 ${searchClause} ${stateClause} ${countryClause} ${cityClause} ${zipClause}
    `;
    const total = totalResult[0].count;

    // Fetch countries
    const countries = await sql`
        SELECT DISTINCT country_code
        FROM review;
    `;
    const countryList = countries.map(({ country_code }) => country_code);

    // Fetch states
    const states = await sql`
        SELECT DISTINCT state
        FROM review
        WHERE 1 = 1 ${countryClause};
    `;
    const stateList = states.map(({ state }) => state);

    // Fetch cities
    const cities = await sql`
        SELECT DISTINCT city
        FROM review
        WHERE 1 = 1 ${countryClause} ${stateClause};
    `;
    const cityList = cities.map(({ city }) => city);

    // Fetch zips
    const zips = await sql`
        SELECT DISTINCT zip
        FROM review
        WHERE 1 = 1 ${countryClause} ${stateClause} ${cityClause};
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
    return this.databaseService.sql<Review[]>`Select *
      FROM review
      WHERE id IN (${id});`;
  }

  public async create(inputReview: Review): Promise<Review> {
    try {
      const filterResult: IResult = await filterReviewWithAI(inputReview);

      const existingReviewsForLandlord: Review[] =
        await this.reviewDataLayerService.getExistingReviewsForLandlord(
          inputReview,
        );
      const reviewSpamDetected: boolean =
        await this.reviewSimilarityService.checkReviewsForSimilarity(
          existingReviewsForLandlord,
          inputReview.review,
        );
      if (reviewSpamDetected) return inputReview; // Don't post the review to the DB if we detect spam

      return this.reviewDataLayerService.createReview(
        inputReview,
        filterResult,
      ); // Hit data layer to create review
    } catch (e) {
      throw e;
    }
  }

  public async update(id: number, review: Review): Promise<Review> {
    return this.reviewDataLayerService.update(id, review);
  }

  async report(id: number, reason: string): Promise<number> {
    reason.length > 250 ? (reason = `${reason.substring(0, 250)}...`) : reason;
    await this.databaseService
      .sql`UPDATE review SET flagged = true, flagged_reason = ${reason}
      WHERE id = ${id};`;

    return id;
  }

  public async delete(id: number): Promise<boolean> {
    await this.databaseService.sql`DELETE
                                   FROM review
                                   WHERE ID = ${id};`;

    return true;
  }

  async getFlagged(): Promise<Review[]> {
    return this.databaseService.sql<
      Review[]
    >`SELECT * FROM review WHERE flagged = true;`;
  }

  public async getStats(): Promise<IStats> {
    const sql = this.databaseService.sql;

    const totalResult = await sql`
        SELECT COUNT(*) as count
        FROM review
    `;
    const total_reviews = totalResult[0].count;

    const totalCA = await sql`SELECT COUNT(*) as count
                FROM review
                WHERE country_code = 'CA'`;
    const total_ca_reviews = totalCA[0].count;

    const ca_states = await sql`
        SELECT DISTINCT state
        FROM review
        WHERE country_code = 'CA';
    `;
    const ca_states_list = ca_states.map(({ state }) => state);

    const ca_total_for_states = [];

    for (let i = 0; i < ca_states_list.length; i++) {
      const key = ca_states_list[i];
      const total = await sql`SELECT COUNT(*) as count
                  FROM review
                  WHERE state = ${ca_states_list[i]}`;
      ca_total_for_states.push({ key: key, total: total[0].count });
    }

    const totalUS = await sql`SELECT COUNT(*) as count
                FROM review
                WHERE country_code = 'US'`;
    const total_us_reviews = totalUS[0].count;

    const us_states = await sql`
        SELECT DISTINCT state
        FROM review
        WHERE country_code = 'US';
    `;
    const us_states_list = us_states.map(({ state }) => state);

    const us_total_for_states = [];

    for (let i = 0; i < us_states_list.length; i++) {
      const key = us_states_list[i];
      const total = await sql`SELECT COUNT(*) as count
                  FROM review
                  WHERE state = ${us_states_list[i]}`;
      us_total_for_states.push({ key: key, total: total[0].count });
    }

    const totalUK = await sql`SELECT COUNT(*) as count
                FROM review
                WHERE country_code = 'GB'`;
    const total_uk_reviews = totalUK[0].count;

    const uk_states = await sql`
        SELECT DISTINCT state
        FROM review
        WHERE country_code = 'GB';
    `;
    const uk_states_list = uk_states.map(({ state }) => state);

    const uk_total_for_states = [];

    for (let i = 0; i < uk_states_list.length; i++) {
      const key = uk_states_list[i];
      const total = await sql`SELECT COUNT(*) as count
                  FROM review
                  WHERE state = ${uk_states_list[i]}`;
      uk_total_for_states.push({ key: key, total: total[0].count });
    }

    const totalAU = await sql`SELECT COUNT(*) as count
                FROM review
                WHERE country_code = 'AU'`;
    const total_au_reviews = totalAU[0].count;

    const au_states = await sql`
        SELECT DISTINCT state
        FROM review
        WHERE country_code = 'AU';
    `;
    const au_states_list = au_states.map(({ state }) => state);

    const au_total_for_states = [];

    for (let i = 0; i < au_states_list.length; i++) {
      const key = au_states_list[i];
      const total = await sql`SELECT COUNT(*) as count
                  FROM review
                  WHERE state = ${au_states_list[i]}`;
      au_total_for_states.push({ key: key, total: total[0].count });
    }

    const totalNZ = await sql`SELECT COUNT(*) as count
                FROM review
                WHERE country_code = 'NZ'`;
    const total_nz_reviews = totalNZ[0].count;

    const nz_states = await sql`
        SELECT DISTINCT state
        FROM review
        WHERE country_code = 'NZ';
    `;
    const nz_states_list = nz_states.map(({ state }) => state);

    const nz_total_for_states = [];

    for (let i = 0; i < nz_states_list.length; i++) {
      const key = nz_states_list[i];
      const total = await sql`SELECT COUNT(*) as count
                  FROM review
                  WHERE state = ${nz_states_list[i]}`;
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

  async getLandlords(): Promise<string[]> {
    const landlords = await this.databaseService
      .sql`SELECT DISTINCT landlord FROM review;`;
    return landlords.map(({ landlord }) => landlord);
  }

  public async getLandlordReviews(landlord: string): Promise<Review[]> {
    landlord = decodeURIComponent(landlord);

    return this.databaseService.sql<Review[]>`Select *
      FROM review
      WHERE landlord IN (${landlord});`;
  }

  public async getLandlordSuggestions(landlord: string): Promise<string[]> {
    if (!landlord) return [];
    const suggestions = await this.databaseService.sql`
    SELECT DISTINCT landlord FROM review WHERE landlord LIKE ${
      '%' + landlord.toLocaleUpperCase() + '%'
    }
    `;
    return suggestions.map(({ landlord }) => landlord);
  }
}