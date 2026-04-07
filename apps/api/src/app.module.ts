import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DBConfig } from './db.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot(DBConfig)],
})
export class AppModule {}
