import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { PasswordService } from './password.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface IPassProps {
  password: string;
}

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updatePassword(
    @Param('id') id: number,
    @Body() password: IPassProps,
  ): Promise<boolean> {
    return this.passwordService.updatePassword(id, password.password);
  }
}