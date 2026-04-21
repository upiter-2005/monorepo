import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { User } from '../user/user.entity';

@Injectable()
export class TokenRepository {
  constructor(
    @InjectRepository(Session)
    private readonly repository: Repository<Session>,
  ) {}

  async create(user: User, refreshToken: string) {
    await this.repository.delete({ user_id: user.id });
    const session = await this.repository.create({
      user_id: user.id,
      refreshToken,
    });

    return this.repository.save(session);
  }

  async findByRefreshToken(refreshToken: string) {
    return this.repository.findOne({ where: { refreshToken } });
  }

  async delete(user_id: string) {
    return this.repository.delete({ user_id });
  }
}
