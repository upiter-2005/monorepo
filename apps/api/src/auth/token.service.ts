import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { TokenRepository } from './token.repository';
import { SessionCreateDto } from './auth.dto';
//import { UserRepository } from '../user/user.repository';
import { User } from '../user/user.entity';

@Injectable()
export class TokenService {
  constructor(
    private tokenRepository: TokenRepository,
    //private userRepository: UserRepository,
  ) {}

  async generate(user: User) {
    const { id, email, role } = user;
    const payload = {
      sub: id,
      email,
      role,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
      expiresIn: '1d',
    });

    return { accessToken, refreshToken };
  }

  async verify(token: string, type: 'access' | 'refresh') {
    const secret =
      type === 'access' ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET;
    jwt.verify(token, secret as string);
  }

  async create(user: User, refreshToken: string) {
    return this.tokenRepository.create(user, refreshToken);
  }

  async delete(user: User) {
    return this.tokenRepository.delete(user.id);
  }
}
