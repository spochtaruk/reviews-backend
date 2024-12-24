import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { GetUser } from 'src/decorators/get-user';
import { UserResponse } from 'src/types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@GetUser() user: UserResponse): Promise<UserResponse> {
    return this.userService.findById(user.userId);
  }
}
