import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CaptchaService } from './captcha-service';

@Module({
  imports: [HttpModule],
  providers: [CaptchaService],
  exports: [CaptchaService],
})
export class CaptchaModule {}
