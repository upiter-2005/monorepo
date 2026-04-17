import { Injectable } from '@nestjs/common';
import { UserPaginationDto, UserParamDto } from '../dto/dto/userGet.dto';
import { UserRepository } from './user.repository';
import { UserCreateDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(params: UserParamDto, pagination: UserPaginationDto) {
    return this.userRepository.findByParam(params, pagination);
  }

  async createUser(userData: UserCreateDto) {
    return this.userRepository.create(userData);
  }
}
