import { DatabaseService } from '../../database/database.service';
import { Review } from './review';
import { IResult } from '../helpers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewModel {
  constructor(private readonly databaseService: DatabaseService) {}

  public async createReview(
    inputReview: Review,
    filterResult: IResult,
  ): Promise<Review> {
    try {
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
          (landlord, country_code, city, state, zip, review, repair, health, stability, privacy, respect, flagged,
          flagged_reason, admin_approved, admin_edited)
          VALUES
          (${inputReview.landlord}, ${inputReview.country_code}, ${inputReview.city}, ${inputReview.state},
          ${inputReview.zip}, ${inputReview.review}, ${inputReview.repair}, ${inputReview.health},
          ${inputReview.stability}, ${inputReview.privacy}, ${inputReview.respect}, ${inputReview.flagged},
          ${inputReview.flagged_reason}, ${inputReview.admin_approved}, ${inputReview.admin_edited})
          RETURNING id;
        `
      )[0].id;

      inputReview.id = id;
      return inputReview;
    } catch (e) {
      throw e;
    }
  }
}
