import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Review } from './models/review';

@Injectable()
export class ReviewService {
  constructor(private readonly databaseService: DatabaseService) {}

  get(): Promise<Review[]> {
    return this.databaseService.sql<Review[]>`SELECT * FROM review;`;
  }

  findOne(id: number): Promise<Review[]> {
    return this.databaseService.sql<
      Review[]
    >`Select * FROM review WHERE ID IN(${id});`;
  }

  async create(review: Review): Promise<Review> {
    review.landlord = review.landlord.toLocaleUpperCase();
    review.countryCode = review.countryCode.toLocaleUpperCase();
    review.city = review.city.toLocaleUpperCase();
    review.state = review.state.toLocaleUpperCase();
    review.zip = review.zip.toLocaleUpperCase();
    review.adminApproved = null;

    const id = (
      await this.databaseService.sql<{ id: number }[]>`
        INSERT INTO review 
          (landlord, countryCode, city, state, zip, review, repair, health, stability, privacy, respect, flagged, flaggedReason, adminApproved) 
        VALUES (${review.landlord}, ${review.countryCode}, ${review.city}, ${review.state}, ${review.zip}, ${review.review}, ${review.repair}, ${review.health}, ${review.stability}, ${review.privacy}, ${review.respect}, ${review.flagged}, ${review.flaggedReason}, ${review.adminApproved}) 
        RETURNING id;`
    )[0].id;

    review.id = id;
    return review;
  }
}
