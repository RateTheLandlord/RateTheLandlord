import { Injectable } from '@nestjs/common';
import postgres from 'postgres';
import * as fs from 'fs';

@Injectable()
export class DatabaseService {
  sql = postgres(process.env.PGURL, {
    ssl: {
      ca: [fs.readFileSync('./certificates/ca-certificate.crt')],
    },
  });
}