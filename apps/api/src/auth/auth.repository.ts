import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async updateLastLoginAt(userId: string, lastLoginAt: Date): Promise<void> {
    await this.repository.update(userId, { lastLoginAt });
  }
}
