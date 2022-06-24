import { Injectable } from '@nestjs/common';

@Injectable()
export class SampleService {
  getHello(): string {
    return 'Hello World!';
  }
}
