import { Module } from '@nestjs/common';
import { CaptchaModule } from 'src/captcha/captcha.module';
import { DatabaseService } from 'src/database/database.service';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewSimilarityService } from './review-text-match';

@Module({
  imports: [CaptchaModule],
  controllers: [ReviewController],
  providers: [ReviewService, DatabaseService, ReviewSimilarityService],
  exports: [ReviewService],
})
export class ReviewModule {}
