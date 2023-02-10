import { Injectable } from '@nestjs/common';
import { IUser, IGetUsers } from './models/user';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(email: string): Promise<IUser[]> {
    console.log('find One User: ', email);
    return this.databaseService.sql<
      IUser[]
    >`SELECT * FROM users WHERE email = ${email}`;
  }

  async deleteUser(id: number): Promise<boolean> {
    await this.databaseService.sql`DELETE FROM users WHERE ID = ${id}`;

    return true;
  }

  async update(id: number, user: IUser): Promise<boolean> {
    console.log(user);
    const salt = bcrypt.genSaltSync(saltOrRounds);
    user.password = await bcrypt.hash(user.password, salt);
    await this.databaseService
      .sql`UPDATE users SET name = ${user.name}, password = ${user.password}, email= ${user.email} WHERE id = ${id}`;

    return true;
  }

  async getAll(): Promise<IGetUsers[]> {
    console.log('Get all users');
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
    console.log(id);
    return user;
  }
}
