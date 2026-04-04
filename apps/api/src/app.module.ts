import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DBConnection } from './db.config';

@Module({
  imports: [UsersModule, AuthModule, DBConnection],
})
export class AppModule {}
