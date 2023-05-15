import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IGetUsers, IUser } from './models/user';
import { UserService } from './user.service';
import { Throttle } from '@nestjs/throttler';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //Protected Route to return all users if user is admin
  @Throttle(10, 100)
  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.userService.getAll();
  }

  //Protected Route to Create new users
  @Throttle(3, 60)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req) {
    return this.userService.create(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Throttle(3, 60)
  @Put('/:id')
  update(@Param('id') id: number, @Body() user: IUser): Promise<boolean> {
    return this.userService.update(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Throttle(3, 60)
  @Get('/:id')
  getUser(@Param('id') id: number): Promise<IGetUsers> {
    return this.userService.getMe(id);
  }

  @UseGuards(JwtAuthGuard)
  @Throttle(1, 60)
  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
}
