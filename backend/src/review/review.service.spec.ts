import { ReviewSimilarityService } from './review-text-match';
import { Review } from './models/review';

describe('ValidateDuplicateReviewService', () => {
  let service: ReviewSimilarityService;

  beforeEach(() => {
    service = new ReviewSimilarityService();
  });

  describe('editDistance', () => {
    it('should return the edit distance between two strings', () => {
      const string1 = 'kitten';
      const string2 = 'sitting';
      const expectedDistance = 3;

      const distance = service.editDistance(string1, string2);

      expect(distance).toBe(expectedDistance);
    });
  });

  describe('reviewSimilarity', () => {
    it('should return the similarity score between two reviews', () => {
      const review1 = 'This is a great product!';
      const review2 = 'This is an amazing product!';
      const expectedSimilarity = 0.7037037037037037;

      const similarity = service.reviewSimilarity(review1, review2);

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
      const reviewUserSubmitted = 'This is an awesome product!';

      const result = await service.checkRreviewsForSimilarity(
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
      const reviewUserSubmitted = 'This product is okay.';

      const result = await service.checkRreviewsForSimilarity(
        reviewsFromDb,
        reviewUserSubmitted,
      );

      expect(result).toBe(false);
    });
  });
});
