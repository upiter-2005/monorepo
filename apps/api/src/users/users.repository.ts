import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { Params } from '@org/types';
import { UserCreateDto } from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findByParam(params: Params) {
    const { page, limit, search, sortBy, order } = params;

    const query = this.repository.createQueryBuilder('user');

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

  async createUser(user: UserCreateDto) {
    const newUser = this.repository.create({
      email: user.email,
      role: user.role,
      lastLoginAt: new Date(),
    });
    return await this.repository.save(newUser);
  }

  async saveUser(user: User) {
    return await this.repository.save(user);
  }
}
