import { ReviewSimilarityService } from './review-text-match';
import { Review } from './models/review';

describe('ValidateDuplicateReviewService', () => {
  let service: ReviewSimilarityService;

  beforeEach(() => {
    service = new ReviewSimilarityService();
  });

  describe('editDistance', () => {
    it('should return the edit distance between two strings', () => {
      const string1: string = 'kitten';
      const string2: string = 'sitting';
      const expectedDistance: number = 3;
      const distance: number = service.editDistance(string1, string2);

      expect(distance).toBe(expectedDistance);
    });
  });

  describe('reviewSimilarity', () => {
    it('should return the similarity score between two reviews', () => {
      const review1: string = 'This is a great product!';
      const review2: string = 'This is an amazing product!';
      const expectedSimilarity: number = 0.7037037037037037;
      const similarity: number = service.reviewSimilarity(review1, review2);

      expect(similarity).toBe(expectedSimilarity);
    });
  });

  describe('checkReviewsForSimilarity', () => {
    it('should return true if a similar review is found in the provided array', async () => {
      const reviewsFromDb: Review[] = [
        {
          id: 1,
          landlord: 'John Doe',
          country_code: 'US',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          review: 'This is a awesome product!',
          repair: 4,
          health: 3,
          stability: 5,
          privacy: 4,
          respect: 5,
          date_added: new Date(),
          flagged: false,
          flagged_reason: '',
          admin_approved: true,
          admin_edited: false,
        },
        {
          id: 2,
          landlord: 'Jane Smith',
          country_code: 'US',
          city: 'San Francisco',
          state: 'CA',
          zip: '94101',
          review: 'This is a great product ye!',
          repair: 5,
          health: 4,
          stability: 5,
          privacy: 3,
          respect: 5,
          date_added: new Date(),
          flagged: false,
          flagged_reason: '',
          admin_approved: true,
          admin_edited: false,
        },
      ];
      const reviewUserSubmitted: string = 'This is a great product!';

      const result: boolean = await service.checkReviewsForSimilarity(
        reviewsFromDb,
        reviewUserSubmitted,
      );

      expect(result).toBe(true);
    });

    it('should return false if no similar review is found in the provided array', async () => {
      const reviewsFromDb: Review[] = [
        {
          id: 1,
          landlord: 'John Doe',
          country_code: 'US',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          review: 'This is a great product!',
          repair: 4,
          health: 3,
          stability: 5,
          privacy: 4,
          respect: 5,
          date_added: new Date(),
          flagged: false,
          flagged_reason: '',
          admin_approved: true,
          admin_edited: false,
        },
        {
          id: 2,
          landlord: 'Jane Smith',
          country_code: 'US',
          city: 'San Francisco',
          state: 'CA',
          zip: '94101',
          review: 'I love this product!',
          repair: 5,
          health: 4,
          stability: 5,
          privacy: 3,
          respect: 5,
          date_added: new Date(),
          flagged: false,
          flagged_reason: '',
          admin_approved: true,
          admin_edited: false,
        },
      ];
      const reviewUserSubmitted: string = 'This sucks so bad I do not like it.';

      const result: boolean = await service.checkReviewsForSimilarity(
        reviewsFromDb,
        reviewUserSubmitted,
      );

      expect(result).toBe(false);
    });
  });
});
