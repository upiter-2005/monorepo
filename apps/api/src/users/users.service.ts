import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { GetUsersDto } from '../dto/dto/get-users.dto';
import { UserCreateDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async fetchUsers(params: GetUsersDto) {
    const { page, limit, search, sortBy, order } = params;

    const query = this.userRepository.createQueryBuilder('user');

    if (search) {
      query.andWhere('user.email ILIKE :search', {
        search: `%${search}%`,
      });
    }

    query.orderBy(`user.${sortBy}`, order);

    query.skip((page - 1) * limit).take(limit);

    const [users, total] = await query.getManyAndCount();

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createUser(body: UserCreateDTO) {
    const email = body.email;
    const user = this.userRepository.create({ email, role: 'user' });
    return await this.userRepository.save(user);
  }
}
