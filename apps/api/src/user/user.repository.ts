import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Params } from '@org/types';
import { UserCreateDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
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
      pagination: {
        total,
      },
    };
  }

  async create(user: UserCreateDto) {
    const newUser = this.repository.create({
      email: user.email,
      role: user.role,
      lastLoginAt: new Date(),
    });
    return await this.repository.save(newUser);
  }

  async save(user: User) {
    return await this.repository.save(user);
  }
}
