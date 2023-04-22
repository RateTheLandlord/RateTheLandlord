import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { Review } from './models/review';

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
  constructor(private readonly databaseService: DatabaseService) {}

  async get(params: ReviewQuery): Promise<Review[]> {
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
    const limit = limitParam ? limitParam : 10;

    const offset = (page - 1) * limit;

    let orderBy = 'id';
    if (sort === 'az' || sort === 'za') {
      orderBy = 'landlord';
    } else if (sort === 'new' || sort === 'old') {
      orderBy = 'dataadded';
    }

    const sortOrder = sort === 'az' || sort === 'old' ? 'ASC' : 'DESC';

    const whereClauses = [];
    if (search) {
      whereClauses.push(
        `(title ILIKE '%${search}%' OR review ILIKE '%${search}%' OR city ILIKE '%${search}%' OR state ILIKE '%${search}%' OR zip ILIKE '%${search}%')`,
      );
    }
    if (state) whereClauses.push(`state = '${state}'`);
    if (country) whereClauses.push(`country = '${country}'`);
    if (city) whereClauses.push(`city = '${city}'`);
    if (zip) whereClauses.push(`zip = '${zip}'`);

    const whereClause =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    return this.databaseService.sql<Review[]>`
      SELECT * FROM review ${whereClause}
      ORDER BY ${orderBy} ${sortOrder} LIMIT ${limit}
      OFFSET ${offset}
    `;
  }

  findOne(id: number): Promise<Review[]> {
    return this.databaseService.sql<
      Review[]
    >`Select * FROM review WHERE id IN(${id});`;
  }

  async create(review: Review): Promise<Review> {
    review.landlord = review.landlord.toLocaleUpperCase();
    review.country_code = review.country_code.toLocaleUpperCase();
    review.city = review.city.toLocaleUpperCase();
    review.state = review.state.toLocaleUpperCase();
    review.zip = review.zip.toLocaleUpperCase();
    review.admin_approved = null;

    const id = (
      await this.databaseService.sql<{ id: number }[]>`
        INSERT INTO review 
          (landlord, country_code, city, state, zip, review, repair, health, stability, privacy, respect, flagged, flagged_reason, admin_approved, admin_edited) 
        VALUES (${review.landlord}, ${review.country_code}, ${review.city}, ${review.state}, ${review.zip}, ${review.review}, ${review.repair}, ${review.health}, ${review.stability}, ${review.privacy}, ${review.respect}, ${review.flagged}, ${review.flagged_reason}, ${review.admin_approved}, ${review.admin_edited}) 
        RETURNING id;`
    )[0].id;

    review.id = id;
    return review;
  }

  async update(id: number, review: Review): Promise<Review> {
    await this.databaseService
      .sql`UPDATE review SET landlord = ${review.landlord}, country_code = ${review.country_code}, city = ${review.city}, state = ${review.state}, zip = ${review.zip}, review = ${review.review}, repair = ${review.repair}, health = ${review.health}, stability = ${review.stability}, privacy = ${review.privacy}, respect = ${review.respect}, flagged = ${review.flagged}, flagged_reason = ${review.flagged_reason}, admin_approved = ${review.admin_approved}, admin_edited = ${review.admin_edited} 
      WHERE id = ${id};`;

    return review;
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
