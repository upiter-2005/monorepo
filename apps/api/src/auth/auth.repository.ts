import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return await this.repository.findOneBy({ email });
  }
}
