import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from './users.entity';
import { GetUsersDto } from '../dto/dto/get-users.dto';
import { UserCreateDTO } from './users.dto';

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }

  async findUsers(params: GetUsersDto) {
    const { page, limit, search, sortBy, order } = params;

    const query = this.createQueryBuilder('user');

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

  async createNewUser(user: UserCreateDTO) {
    const newUser = this.create({
      email: user.email,
      role: user.role,
      lastLoginAt: new Date(),
    });
    return await this.save(newUser);
  }
}
