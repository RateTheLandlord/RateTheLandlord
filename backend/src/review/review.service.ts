import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { Review } from './models/review';
import { filterReview } from './helpers';

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

export type ReviewsResponse = {
  reviews: Review[];
  total: number;
  countries: string[];
  states: string[];
  cities: string[];
  zips: string[];
  limit: number;
};

@Injectable()
export class ReviewService {
  constructor(private readonly databaseService: DatabaseService) {}

  async get(params: ReviewQuery): Promise<ReviewsResponse> {
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
    const countryClause = country ? sql`AND country_code = ${country.toUpperCase()}` : sql``;
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
      SELECT DISTINCT state FROM review;
    `;
    const stateList = states.map(({ state }) => state);

    // Fetch cities
    const cities = await sql`
      SELECT DISTINCT city FROM review;
    `;
    const cityList = cities.map(({ city }) => city);

    // Fetch zips
    const zips = await sql`
      SELECT DISTINCT zip FROM review;
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

  findOne(id: number): Promise<Review[]> {
    return this.databaseService.sql<
      Review[]
    >`Select * FROM review WHERE id IN(${id});`;
  }

  async create(inputReview: Review): Promise<Review> {
    const filterResult = filterReview(inputReview)

    inputReview.landlord = inputReview.landlord.substring(0, 150).toLocaleUpperCase();
    inputReview.country_code = inputReview.country_code.toLocaleUpperCase();
    inputReview.city = inputReview.city.substring(0, 150).toLocaleUpperCase();
    inputReview.state = inputReview.state.toLocaleUpperCase();
    inputReview.zip = inputReview.zip.substring(0, 50).toLocaleUpperCase();
    inputReview.admin_approved = null;
    inputReview.flagged = filterResult.flagged
    inputReview.flagged_reason = filterResult.reason

    const id = (
      await this.databaseService.sql<{ id: number }[]>`
        INSERT INTO review 
          (landlord, country_code, city, state, zip, review, repair, health, stability, privacy, respect, flagged, flagged_reason, admin_approved, admin_edited) 
        VALUES (${inputReview.landlord}, ${inputReview.country_code}, ${inputReview.city}, ${inputReview.state}, ${inputReview.zip}, ${inputReview.review}, ${inputReview.repair}, ${inputReview.health}, ${inputReview.stability}, ${inputReview.privacy}, ${inputReview.respect}, ${inputReview.flagged}, ${inputReview.flagged_reason}, ${inputReview.admin_approved}, ${inputReview.admin_edited}) 
        RETURNING id;`
    )[0].id;

    inputReview.id = id;
    return inputReview;
  }

  async update(id: number, review: Review): Promise<Review> {
    await this.databaseService
      .sql`UPDATE review SET landlord = ${review.landlord}, country_code = ${review.country_code}, city = ${review.city}, state = ${review.state}, zip = ${review.zip}, review = ${review.review}, repair = ${review.repair}, health = ${review.health}, stability = ${review.stability}, privacy = ${review.privacy}, respect = ${review.respect}, flagged = ${review.flagged}, flagged_reason = ${review.flagged_reason}, admin_approved = ${review.admin_approved}, admin_edited = ${review.admin_edited} 
      WHERE id = ${id};`;

    return review;
  }

  async report(id: number, reason: string): Promise<number> {
    reason.length > 250
      ? (reason = `${reason.substring(0, 250)}...`)
      : (reason = reason);
    await this.databaseService
      .sql`UPDATE review SET flagged = true, flagged_reason = ${reason}
      WHERE id = ${id};`;

    return id;
  }

  async delete(id: number): Promise<boolean> {
    await this.databaseService.sql`DELETE FROM review WHERE ID = ${id};`;

    return true;
  }

  getFlagged(): Promise<Review[]> {
    return this.databaseService.sql<
      Review[]
    >`SELECT * FROM review WHERE flagged = true;`;
  }
}
