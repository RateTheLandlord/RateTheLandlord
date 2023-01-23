import { Injectable } from '@nestjs/common';
import { IUser } from './models/user';

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<IUser> {
    // Function to find one user
  }
}
