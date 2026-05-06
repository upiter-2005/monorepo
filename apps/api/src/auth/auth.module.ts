import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthRepository } from './auth.repository';
import { SessionService } from './session.service';
import { SessionRepository } from './session.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtModuleConfig } from '../jwt.config';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Session]),
    PassportModule,
    JwtModule.registerAsync(jwtModuleConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    SessionService,
    SessionRepository,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard, AuthService, SessionService],
})
export class AuthModule {}
