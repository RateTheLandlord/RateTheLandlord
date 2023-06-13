import { DatabaseService } from "../../database/database.service";
import { Review } from "./review";
import { IResult } from "../helpers";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { FAILED_TO_RETRIEVE_REVIEWS } from "../../auth/constants";

/**
 * Data service layer for the reviews service of our backend.
 * Provides methods to create, retrieve, update or handle any other CRUD operations for reviews in the database.
 */
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

      const id: number = (
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

  public async getExistingReviewsForLandlord(
    inputReview: Review,
  ): Promise<Review[]> {
    try {
      return await this.databaseService.sql<Review[]>`SELECT REVIEW
        FROM review
        WHERE landlord = ${inputReview.landlord.toLocaleUpperCase()}
          AND ZIP = ${inputReview.zip.toLocaleUpperCase()};`;
    } catch (e) {
      throw new InternalServerErrorException(FAILED_TO_RETRIEVE_REVIEWS);
    }
  }

  public async update(id: number, review: Review): Promise<Review> {

    await this.databaseService.sql`UPDATE review
           SET landlord = ${review.landlord
                            .substring(0, 150)
                            .toLocaleUpperCase()},
               country_code = ${review.country_code.toLocaleUpperCase()},
               city = ${review.city.substring(0, 150).toLocaleUpperCase()},
               state = ${review.state.toLocaleUpperCase()},
               zip = ${review.zip.substring(0, 50).toLocaleUpperCase()},
               review = ${review.review},
               repair = ${review.repair},
               health = ${review.health},
               stability = ${review.stability},
               privacy = ${review.privacy},
               respect = ${review.respect},
               flagged = ${review.flagged},
               flagged_reason = ${review.flagged_reason},
               admin_approved = ${review.admin_approved},
               admin_edited   = ${review.admin_edited}
           WHERE id = ${id};`;

    return review;
  }
}