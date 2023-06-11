import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { INVALID_CAPTCHA } from '../auth/constants';
import { CaptchaPayload } from './captcha-types';

@Injectable()
export class CaptchaService {
  VERIFY_URL = 'https://hcaptcha.com/siteverify';

  constructor(private readonly httpService: HttpService) {}

  async verifyToken(token: string, ip?: string): Promise<boolean> {
    const data: CaptchaPayload = {
      secret: process.env.HCPATCHA_SECRET_KEY,
      sitekey: process.env.HCPATCHA_SITE_KEY,
      response: token,
      remoteip: ip ? ip : undefined,
    };

    Object.keys(data).forEach(
      (key: string) => data[key] === undefined && delete data[key],
    );

    const response = await this.httpService.axiosRef.post(
      this.VERIFY_URL,
      new URLSearchParams(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    const success: boolean = response.data?.success;
    if (!success) throw new BadRequestException(INVALID_CAPTCHA);
    return true;
  }
}
