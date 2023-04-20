import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CaptchaService {
  VERIFY_URL = 'https://hcaptcha.com/siteverify';

  constructor(private readonly httpService: HttpService) {}

  async verifyToken(token: string, ip?: string): Promise<boolean> {
    const data = {
      secret: process.env.HCPATCHA_SECRET_KEY,
      sitekey: process.env.HCPATCHA_SITE_KEY,
      response: token,
      remoteip: ip ? ip : undefined,
    };

    Object.keys(data).forEach(
      (key) => data[key] === undefined && delete data[key],
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

    return response.data?.success ?? false;
  }
}
