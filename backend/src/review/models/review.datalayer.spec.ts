import { Test, TestingModule } from '@nestjs/testing';
import { ReviewModel } from './review-data-layer';
import { DatabaseService } from '../../database/database.service';
import { Review } from './review';
import { ReviewService } from '../review.service';

const mockReview: Review = {
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
};

describe('ReviewDataLayerService', () => {
  let dataLayerService: ReviewModel;
  let databaseService: DatabaseService;
  let reviewService: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ReviewModel,
          useValue: {
            update: jest.fn((id, review) => {
              databaseService.sql`UPDATE review SET review = ${review.review} WHERE id = ${id}`;
              return Promise.resolve(review);
            }),
          },
        },
        {
          provide: DatabaseService,
          useValue: {
            sql: jest.fn(),
          },
        },
        {
          provide: ReviewService,
          useValue: {
            update: jest.fn((id, review) =>
              dataLayerService.update(id, review),
            ),
          },
        },
      ],
    }).compile();

    dataLayerService = module.get<ReviewModel>(ReviewModel);
    databaseService = module.get<DatabaseService>(DatabaseService);
    reviewService = module.get<ReviewService>(ReviewService);
  });

  it('should call databaseService.sql when review service update is called', async () => {
    await reviewService.update(1, mockReview);

    expect(databaseService.sql).toBeCalled();

    expect(databaseService.sql).toBeCalledWith(
      ['UPDATE review SET review = ', ' WHERE id = ', ''],
      'good',
      1,
    );
  });
});
