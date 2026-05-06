import { Injectable } from '@nestjs/common';
import { UserPaginationDto, UserParamDto } from './user.get.dto';
import { UserRepository } from './user.repository';
import { UserCreateDto } from './user.dto';
import { UserPayload, UsersReturn } from './user.types';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(params: UserParamDto, pagination: UserPaginationDto): Promise<UsersReturn> {
    return this.userRepository.findByParam(params, pagination);
  }

  async findById(id: string): Promise<UserPayload | null> {
    return this.userRepository.findById(id);
  }

  async createUser(payload: UserCreateDto): Promise<UserPayload | null> {
    const user = await this.userRepository.findByEmail(payload.email);

    if (user) {
      return null;
    }

    return this.userRepository.create(payload);
  }
}
