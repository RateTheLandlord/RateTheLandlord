import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CaptchaModule } from './captcha/captcha.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ReviewModule,
    CaptchaModule,
    AuthModule,
    UserModule,
    PasswordModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
