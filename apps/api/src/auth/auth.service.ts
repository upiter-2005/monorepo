import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from '../users/users.entity';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async login(payload: AuthDto): Promise<Users> {
    const { email } = payload;

    let user = await this.userRepository.findOneBy({ email });
    const NOW = new Date();

    if (user) {
      user.lastLoginAt = NOW;
    } else {
      user = this.userRepository.create({
        email,
        role: 'user',
        lastLoginAt: NOW,
      });
    }

    return this.userRepository.save(user);
  }
}
