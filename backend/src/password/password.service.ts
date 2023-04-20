import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class PasswordService {
  constructor(private readonly databaseService: DatabaseService) {}

  async updatePassword(id: number, password: string): Promise<boolean> {
    const salt = bcrypt.genSaltSync(saltOrRounds);
    const newPassword = await bcrypt.hash(password, salt);
    await this.databaseService
      .sql`UPDATE users SET password = ${newPassword} WHERE id = ${id}`;

    return true;
  }
}
