import { Body, Controller, Get, Post, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto, UserResponseDto } from './user.dto';
import { UserGetDto } from './user.get.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: UserGetDto): Promise<UserResponseDto> {
    const { page, limit, search, sortBy, order } = query;

    return this.userService.getUsers({ search, sortBy, order }, { page, limit });
  }

  @Post()
  async create(@Body() payload: UserCreateDto): Promise<UserCreateDto> {
    const { email, role } = payload;

    const user = await this.userService.createUser({ email, role });

    if (!user) {
      throw new HttpException('', HttpStatus.CONFLICT);
    }

    return user;
  }
}
