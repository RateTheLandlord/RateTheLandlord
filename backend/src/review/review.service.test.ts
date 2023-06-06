import { ReviewService } from './review.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ReviewService', () => {
  let reviewService: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewService],
    }).compile();

    reviewService = module.get<ReviewService>(ReviewService);
  });

  describe('Edit Distance and Review Similarity', () => {
    // Test editDistance function
    describe('editDistance', () => {
      it('should calculate the edit distance between two strings', () => {
        expect(reviewService.editDistance('kitten', 'mitten')).toBe(2);
        expect(reviewService.editDistance('Hello World', 'Helloo World')).toBe(1);
        expect(reviewService.editDistance('OpenAI GPT-3', 'OpenAI GPT-4')).toBe(2);
        expect(reviewService.editDistance('This is a test', 'This is not a test')).toBe(3);
      });
    });

    // Test reviewSimilarity function
    describe('reviewSimilarity', () => {
      it('should calculate the similarity score between two reviews', () => {
        expect(reviewService.reviewSimilarity('Hello World', 'Hello World')).toBe(1.0);
        expect(reviewService.reviewSimilarity('Hello', 'Helloo')).toBeCloseTo(0.8);
        expect(reviewService.reviewSimilarity('OpenAI GPT-3', 'OpenAI GPT-4')).toBeCloseTo(0.933333, 6);
        expect(reviewService.reviewSimilarity('This is a test', 'This is not a test')).toBeCloseTo(0.823529, 6);
      });
    });
  });
});