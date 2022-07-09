import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Review } from './models/review';

@Injectable()
export class ReviewService {
  constructor(private readonly databaseService: DatabaseService) {}

  get(): Promise<Review[]> {
    return this.databaseService.sql<Review[]>`SELECT * FROM review;`;
  }

  async create(review: Review): Promise<Review> {
    review.landlord = review.landlord.toLocaleUpperCase();
    review.countryCode = review.countryCode.toLocaleUpperCase();
    review.city = review.city.toLocaleUpperCase();
    review.state = review.state.toLocaleUpperCase();
    review.zip = review.zip.toLocaleUpperCase();

    const id = (
      await this.databaseService.sql<{ id: number }[]>`
        INSERT INTO review 
          (landlord, countryCode, city, state, zip, review, repair, health, stability, privacy, respect) 
        VALUES (${review.landlord}, ${review.countryCode}, ${review.city}, ${review.state}, ${review.zip}, ${review.review}, ${review.repair}, ${review.health}, ${review.stability}, ${review.privacy}, ${review.respect}) 
        RETURNING id;`
    )[0].id;

    review.id = id;
    return review;
  }
}
