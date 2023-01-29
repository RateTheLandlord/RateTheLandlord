import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Review } from './models/review';

@Injectable()
export class ReviewService {
  constructor(private readonly databaseService: DatabaseService) {}

  get(): Promise<Review[]> {
    console.log('Get All Reviews');
    return this.databaseService.sql<Review[]>`SELECT * FROM review;`;
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
    console.log(id);
    return review;
  }

  async update(id: number, review: Review): Promise<Review> {
    console.log('Review: ', review);
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
