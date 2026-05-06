import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SECRET_KEY } from '../../constants/jwtSecrets';
import { VerifyJwtPayload } from '../auth.types';
import { TOKEN_ERRORS } from '@org/constants';

type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const secret = configService.get<string>(SECRET_KEY.ACCESS);

    if (!secret) {
      throw new Error(TOKEN_ERRORS.JWT_ACCESS_NOT_DEFIND);
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  validate(payload: JwtPayload): VerifyJwtPayload {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
