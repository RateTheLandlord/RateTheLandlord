import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { IStats, Review, ReviewsResponse } from './models/review';
import { CaptchaService } from 'src/captcha/captcha-service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateReview } from './models/create-review';

describe('ReviewController', () => {
  let reviewController: ReviewController;
  let reviewService: ReviewService;
  let captchaService: CaptchaService;

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
        flagged: true,
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

  const mockStats: IStats = {
    total_reviews: 10,
    total_ca_reviews: {
      total: 2,
      states: [
        {
          key: '1',
          total: 1,
        },
        {
          key: '2',
          total: 1,
        },
      ],
    },
    total_us_reviews: {
      total: 2,
      states: [
        {
          key: '1',
          total: 1,
        },
        {
          key: '2',
          total: 1,
        },
      ],
    },
    total_au_reviews: {
      total: 2,
      states: [
        {
          key: '1',
          total: 1,
        },
        {
          key: '2',
          total: 1,
        },
      ],
    },
    total_uk_reviews: {
      total: 2,
      states: [
        {
          key: '1',
          total: 1,
        },
        {
          key: '2',
          total: 1,
        },
      ],
    },
    total_nz_reviews: {
      total: 2,
      states: [
        {
          key: '1',
          total: 1,
        },
        {
          key: '2',
          total: 1,
        },
      ],
    },
  };

  const mockLandlords = ['John Smith', 'Daniel Smith', 'Sandy Smith'];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        {
          provide: ReviewService,
          useValue: {
            get: jest.fn().mockReturnValue(mockReviews),
            findOne: jest.fn().mockReturnValue(mockReviews.reviews[0]),
            update: jest.fn().mockReturnValue(mockReviews.reviews[0]),
            report: jest.fn().mockReturnValue(1),
            delete: jest.fn().mockReturnValue(true),
            create: jest.fn().mockReturnValue(mockReviews.reviews[0]),
            getFlagged: jest.fn().mockReturnValue(mockReviews),
            getStats: jest.fn().mockReturnValue(mockStats),
            getLandlords: jest.fn().mockReturnValue(mockLandlords),
            getLandlordReviews: jest.fn().mockReturnValue(mockReviews.reviews),
            getLandlordSuggestions: jest.fn().mockReturnValue(mockLandlords),
          },
        },
        {
          provide: CaptchaService,
          useValue: {
            verifyToken: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    reviewController = module.get<ReviewController>(ReviewController);
    reviewService = module.get<ReviewService>(ReviewService);
    captchaService = module.get<CaptchaService>(CaptchaService);
  });

  describe('getAllReviews', () => {
    it('should return all reviews when no query parameters are provided', async () => {
      jest.spyOn(reviewService, 'get').mockResolvedValue(mockReviews);

      const result = await reviewController.get();

      expect(result).toBe(mockReviews);
    });

    it('should call query params correctly', async () => {
      const mockGetReviews = jest.fn().mockReturnValue(mockReviews);

      jest.spyOn(reviewService, 'get').mockImplementation(mockGetReviews);

      const queryParams = {
        page: 1,
        limit: 10,
        search: 'John Wright',
        sort: 'az' as 'az' | 'za' | 'new' | 'old',
        state: 'CA',
        country: 'US',
        city: 'San Francisco',
        zip: '123',
      };

      const result = await reviewController.get(
        queryParams.page,
        queryParams.limit,
        queryParams.search,
        queryParams.sort,
        queryParams.state,
        queryParams.country,
        queryParams.city,
        queryParams.zip,
      );

      expect(mockGetReviews).toBeCalledWith(queryParams);
      expect(result).toBe(mockReviews);
    });
  });

  describe('getOneReview', () => {
    it('should return correct review', async () => {
      const reviewId = 1;

      const result = await reviewController.findOne(reviewId.toString());

      expect(reviewService.findOne).toBeCalledWith(reviewId);
      expect(result).toBe(mockReviews.reviews[0]);
    });
  });

  describe('updateReview', () => {
    it('should call reviewService.update if auth', async () => {
      const reviewId = 1;
      const updatedReview: Review = {
        ...mockReviews.reviews[0],
        review: 'bad',
      };

      await reviewController.update(reviewId, updatedReview);

      expect(reviewService.update).toBeCalledWith(reviewId, updatedReview);
    });
  });

  describe('reportReview', () => {
    const mockId = 1;
    const mockReason = 'This is a test reason';
    const mockIp = '127.0.0.1';

    it('should call reviewService.report with correct params and return id with valid captcha', async () => {
      const mockCaptchaToken = 'valid-captcha-token';

      jest.spyOn(captchaService, 'verifyToken').mockResolvedValue(true);

      const result = await reviewController.report(
        mockId,
        { captchaToken: mockCaptchaToken, flagged_reason: mockReason },
        mockIp,
      );

      expect(captchaService.verifyToken).toBeCalledWith(
        mockCaptchaToken,
        mockIp,
      );
      expect(reviewService.report).toBeCalledWith(mockId, mockReason);
      expect(result).toBe(mockId);
    });

    it('should throw error with invalid captcha', async () => {
      const mockCaptchaToken = 'invalid-captcha-token';

      jest.spyOn(captchaService, 'verifyToken').mockResolvedValue(false);

      await expect(
        reviewController.report(
          mockId,
          { captchaToken: mockCaptchaToken, flagged_reason: mockReason },
          mockIp,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteReview', () => {
    const reviewId = 1;
    it('should call reviewService.delete correctly if auth', async () => {
      const result = await reviewController.delete(reviewId);

      expect(reviewService.delete).toBeCalledWith(reviewId);
      expect(result).toBe(true);
    });
  });

  describe('createReview', () => {
    const mockReview: CreateReview = {
      captchaToken: 'valid-captcha-token',
      review: mockReviews.reviews[0],
    };
    const mockIp = '127.0.0.1';

    it('should call reviewService.create with correct params if valid captcha', async () => {
      jest.spyOn(captchaService, 'verifyToken').mockResolvedValue(true);

      const result = await reviewController.create(mockReview, mockIp);

      expect(captchaService.verifyToken).toBeCalledWith(
        mockReview.captchaToken,
        mockIp,
      );
      expect(reviewService.create).toBeCalledWith(mockReview.review);
      expect(result).toBe(mockReview.review);
    });

    it('should throw HttpException with status NOT_ACCEPTABLE when BadRequestException is thrown', async () => {
      jest
        .spyOn(captchaService, 'verifyToken')
        .mockRejectedValue(new BadRequestException());

      await expect(reviewController.create(mockReview, mockIp)).rejects.toThrow(
        HttpException,
      );

      await expect(
        reviewController.create(mockReview, mockIp),
      ).rejects.toHaveProperty('status', HttpStatus.NOT_ACCEPTABLE);
    });

    it('should throw HttpException with status INTERNAL_SERVER_ERROR when other error is thrown', async () => {
      jest.spyOn(captchaService, 'verifyToken').mockRejectedValue(new Error());

      await expect(reviewController.create(mockReview, mockIp)).rejects.toThrow(
        HttpException,
      );
      await expect(
        reviewController.create(mockReview, mockIp),
      ).rejects.toHaveProperty('status', HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe('getFlaggedReviews', () => {
    it('should call reviewService.getFlagged and return its result', async () => {
      const mockFlaggedReviews = [mockReviews.reviews[0]];

      jest
        .spyOn(reviewService, 'getFlagged')
        .mockResolvedValue(mockFlaggedReviews);

      const result = await reviewController.getFlagged();

      expect(reviewService.getFlagged).toBeCalled();
      expect(result).toBe(mockFlaggedReviews);
    });
  });

  describe('getStats', () => {
    it('should call reviewService.getStats and return stats correctly', async () => {
      const result = await reviewController.getStats();

      expect(reviewService.getStats).toBeCalled();
      expect(result).toBe(mockStats);
    });
  });

  describe('getLandlords', () => {
    it('should call reviewService.getLandlords and return landlords correctly', async () => {
      const result = await reviewController.getLandlords();

      expect(reviewService.getLandlords).toBeCalled();
      expect(result).toBe(mockLandlords);
    });
  });

  describe('getLandlordReviews', () => {
    const mockLandlord = 'Ket Long';
    const mockLandlordReviews = [
      mockReviews.reviews[0],
      mockReviews.reviews[1],
    ];

    it('should call reviewService.getLandlordReviews with correct params and return LandlordReviews correctly', async () => {
      const result = await reviewController.getLandlordReviews({
        landlord: mockLandlord,
      });

      expect(reviewService.getLandlordReviews).toBeCalledWith(mockLandlord);
      expect(result).toStrictEqual(mockLandlordReviews);
    });
  });

  describe('getLandlordSuggestions', () => {
    const mockLandlord = 'Dom';

    it('shoudl call reviewService.getLandlordSuggestions with correct params and return names', async () => {
      const result = await reviewController.getLandlordSuggestions(
        mockLandlord,
      );

      expect(reviewService.getLandlordSuggestions).toBeCalledWith(mockLandlord);
      expect(result).toStrictEqual(mockLandlords);
    });
  });
});
