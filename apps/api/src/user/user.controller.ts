import { Body, Controller, Get, Post, Query, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './user.dto';
import { UserGetDto } from '../dto/dto/userGet.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() query: UserGetDto) {
    const { page, limit, search, sortBy, order } = query;

    return this.userService.getUsers({ search, sortBy, order }, { page, limit });
  }

  @Post()
  async create(@Body() payload: UserCreateDto) {
    const { email, role } = payload;

    const user = await this.userService.createUser({ email, role });

    if (!user) {
      throw new HttpException('', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
