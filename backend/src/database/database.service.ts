import { Injectable } from '@nestjs/common';
import postgres from 'postgres';

@Injectable()
export class DatabaseService {
  sql = postgres();
}
