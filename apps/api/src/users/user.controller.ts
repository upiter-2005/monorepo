import { Body, Controller, Get, Post, Query, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './users.dto';
import { GetUsersDto } from '../dto/dto/get-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: GetUsersDto) {
    const { page, limit, search, sortBy, order } = query;
    return this.usersService.fetchUsers({ page, limit, search, sortBy, order });
  }

  @Post()
  async createUser(@Body() payload: UserCreateDto) {
    const { email, role } = payload;

    const user = await this.usersService.createUser({ email, role });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      user,
      status: HttpStatus.CREATED,
    };
  }
}
