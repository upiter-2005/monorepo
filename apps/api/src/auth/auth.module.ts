import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthRepository } from './auth.repository';
import { TokenService } from './token.service';
import { TokenRepository } from './token.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConfig } from '../jwt.config';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Session]),
    PassportModule,
    JwtModule.register(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, TokenService, TokenRepository, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
