import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './session.entity';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(Session)
    private readonly repository: Repository<Session>,
  ) {}

  async create(id: string, refreshToken: string): Promise<Session> {
    await this.repository.delete({ user_id: id });
    const session = await this.repository.create({
      user_id: id,
      refreshToken,
    });

    return this.repository.save(session);
  }

  async findByRefreshToken(refreshToken: string): Promise<Session | null> {
    return this.repository.findOne({ where: { refreshToken } });
  }

  async deleteByUserId(user_id: string): Promise<DeleteResult> {
    return this.repository.delete({ user_id });
  }

  async deleteByToken(refreshToken: string): Promise<DeleteResult> {
    return this.repository.delete({ refreshToken });
  }
}
