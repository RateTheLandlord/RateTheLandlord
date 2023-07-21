import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewsResponse } from './models/review';
import { CaptchaService } from 'src/captcha/captcha-service';

describe('ReviewController', () => {
  let reviewController: ReviewController;
  let reviewService: ReviewService;

  const mockReviews: ReviewsResponse = {
    reviews: [
      {
        id: 1,
        landlord: 'John Wright',
        country_code: '111',
        city: 'San Francisco',
        state: 'CA',
        zip: '123',
        review: 'good',
        repair: 3,
        health: 3,
        stability: 3,
        privacy: 3,
        respect: 3,
        flagged: false,
        flagged_reason: 'unknown',
        admin_approved: true,
        admin_edited: false,
        date_added: new Date(),
      },
      {
        id: 2,
        landlord: 'Sam Smith',
        country_code: '111',
        city: 'San Francisco',
        state: 'CA',
        zip: '1233',
        review: 'good',
        repair: 3,
        health: 3,
        stability: 3,
        privacy: 3,
        respect: 3,
        flagged: false,
        flagged_reason: 'unknown',
        admin_approved: true,
        admin_edited: false,
        date_added: new Date(),
      },
    ],
    total: 2,
    countries: ['US'],
    states: ['NY', 'CA'],
    cities: ['New York', 'San Francisco'],
    zips: ['123', '1233'],
    limit: 25,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        {
          provide: ReviewService,
          useValue: {
            get: jest.fn().mockReturnValue(mockReviews),
          },
        },
        {
          provide: CaptchaService,
          useValue: {},
        },
      ],
    }).compile();

    reviewController = module.get<ReviewController>(ReviewController);
    reviewService = module.get<ReviewService>(ReviewService);
  });

  describe('getAllReviews', () => {
    it('should return all reviews when no query parameters are provided', async () => {
      jest.spyOn(reviewService, 'get').mockResolvedValue(mockReviews);

      const result = await reviewController.get();

      expect(result).toBe(mockReviews);
    });
  });
});
