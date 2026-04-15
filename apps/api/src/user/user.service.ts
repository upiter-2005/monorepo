import { Injectable } from '@nestjs/common';
import { UserPaginationDto, UserParamDto } from '../dto/dto/userGet.dto';
import { UserRepository } from './user.repository';
import { UserCreateDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}

  async getUsers(params: UserParamDto, pagination: UserPaginationDto) {
    return this.usersRepository.findByParam(params, pagination);
  }

  async createUser(userData: UserCreateDto) {
    return this.usersRepository.create(userData);
  }
}
