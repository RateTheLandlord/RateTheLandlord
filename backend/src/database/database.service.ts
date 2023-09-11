import { Injectable } from '@nestjs/common';
import postgres from 'postgres';
import * as fs from 'fs';

@Injectable()
export class DatabaseService {
  sql = postgres(process.env.PGURL, {
    ssl: {
      ca: [fs.readFileSync('./src/certificates/ca-certificate.crt')],
    },
  });
}
