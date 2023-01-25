import { Injectable } from '@nestjs/common';
import { IUser } from './models/user';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(email: string): Promise<IUser[]> {
    console.log('fineOne User');
    return this.databaseService.sql<
      IUser[]
    >`SELECT * FROM users WHERE email = ${email}`;
  }

  async getAll(): Promise<IUser[]> {
    console.log('Get all users');
    return this.databaseService.sql<IUser[]>`Select * FROM users`;
  }

  async create(user: IUser): Promise<IUser> {
    user.email = user.email.toLocaleUpperCase();
    user.name = user.name.toLocaleUpperCase();
    const salt = bcrypt.genSaltSync(saltOrRounds);
    user.password = await bcrypt.hash(user.password, salt);

    const id = (
      await this.databaseService.sql<{ id: number }[]>`
        INSERT INTO users (name, email, password, blocked, role) VALUES (${user.email}, ${user.name}, ${user.password}, ${user.blocked}, ${user.role}) RETURNING id
        ;`
    )[0].id;
    user.id = id;
    console.log(id);
    return user;
  }
}
