import { Injectable } from '@nestjs/common';
import { IGetUsers, IUser } from './models/user';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(email: string): Promise<IUser[]> {
    return this.databaseService.sql<
      IUser[]
    >`SELECT * FROM users WHERE email = ${email}`;
  }

  async getMe(id: number): Promise<IGetUsers> {
    const users = await this.databaseService.sql<
      IUser[]
    >`SELECT * FROM users WHERE id = ${id}`;

    const arrUsers = (await users).map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    });
    return arrUsers[0];
  }

  async deleteUser(id: number): Promise<boolean> {
    await this.databaseService.sql`DELETE FROM users WHERE ID = ${id}`;

    return true;
  }

  async update(id: number, user: IUser): Promise<boolean> {
    await this.databaseService
      .sql`UPDATE users SET name = ${user.name}, email= ${user.email} WHERE id = ${id}`;

    return true;
  }

  async updateUserLockout(id: number, user: IUser): Promise<boolean> {
    await this.databaseService
      .sql`UPDATE users SET login_attempts = ${user.login_attempts}, login_lockout = ${user.login_lockout}, last_login_attempt = ${user.last_login_attempt} WHERE id = ${id}`;

    return true;
  }

  async getAll(): Promise<IGetUsers[]> {
    const fullUsers = this.databaseService.sql<IUser[]>`Select * FROM users`;
    const users = (await fullUsers).map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    });
    return users;
  }

  async create(user: IUser): Promise<IUser> {
    const salt = bcrypt.genSaltSync(saltOrRounds);
    user.password = await bcrypt.hash(user.password, salt);

    const id = (
      await this.databaseService.sql<{ id: number }[]>`
        INSERT INTO users (name, email, password, blocked, role) VALUES ( ${user.name}, ${user.email}, ${user.password}, ${user.blocked}, ${user.role}) RETURNING id
        ;`
    )[0].id;
    user.id = id;
    return user;
  }
}
