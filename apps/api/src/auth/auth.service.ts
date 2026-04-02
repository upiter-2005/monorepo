// auth.service.ts
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

  async login(dto: AuthDto): Promise<Users> {
    const { email, firstName } = dto;

    let user = await this.userRepository.findOneBy({ email });

    if (user) {
      user.lastLoginAt = new Date();
      return this.userRepository.save(user);
    }

    user = this.userRepository.create({
      email,
      firstName,
      role: 'user',
    });

    return this.userRepository.save(user);
  }
}
