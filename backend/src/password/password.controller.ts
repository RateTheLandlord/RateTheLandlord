import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { PasswordService } from './password.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updatePassword(
    @Param('id') id: number,
    @Body() password: string,
  ): Promise<boolean> {
    console.log('Controller: id: ', id, ' password: ', password);
    return this.passwordService.updatePassword(id, password);
  }
}
