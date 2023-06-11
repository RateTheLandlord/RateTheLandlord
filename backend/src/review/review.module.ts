import { Module } from '@nestjs/common';
import { CaptchaModule } from 'src/captcha/captcha.module';
import { DatabaseService } from 'src/database/database.service';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewSimilarityService } from './review-text-match';
import {ReviewModel} from "./models/review-data-layer";

@Module({
  imports: [CaptchaModule],
  controllers: [ReviewController],
  providers: [ReviewService, DatabaseService, ReviewSimilarityService, ReviewModel],
  exports: [ReviewService],
})
export class ReviewModule {}
