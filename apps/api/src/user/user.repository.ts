import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Params, Pagination } from '@org/types';
import { UserCreateDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersReturn } from './user.types';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findByParam(params: Partial<Params>, pagination: Pagination): Promise<UsersReturn> {
    const { search, sortBy, order } = params;
    const { page, limit } = pagination;

    const query = this.repository.createQueryBuilder('user');

    if (search) {
      query.andWhere('user.email ILIKE :search', {
        search: `%${search}%`,
      });
    }

    query.orderBy(`user.${sortBy}`, order);

    query.skip((page - 1) * limit).take(limit);

    const [users, totalCount] = await query.getManyAndCount();

    return {
      data: users,
      totalCount,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(payload: UserCreateDto): Promise<User> {
    const { email, role } = payload;
    const user = this.repository.create({
      email,
      role,
      lastLoginAt: new Date(),
    });

    return this.repository.save(user);
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
