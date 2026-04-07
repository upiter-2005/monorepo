import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetUsersDto } from '../dto/dto/get-users.dto';
import { UsersRepository } from './users.repository';
import { UserCreateDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async fetchUsers(params: GetUsersDto) {
    const usersData = await this.usersRepository.findByParam(params);
    return usersData;
  }

  async createUser(body: UserCreateDTO) {
    const { email, role } = body;
    const user = await this.usersRepository.createUser({ email, role });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      user,
      status: HttpStatus.CREATED,
    };
  }
}
