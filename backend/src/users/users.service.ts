import { Injectable } from '@nestjs/common';
import { IUser } from './models/user';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(email: string): Promise<IUser[]> {
    console.log('fineOne User');
    return this.databaseService.sql<
      IUser[]
    >`SELECT * FROM users WHERE email = ${email}`;
  }
}
