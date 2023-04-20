import { Review } from './review';

export interface CreateReview {
  captchaToken: string;
  review: Review;
}
