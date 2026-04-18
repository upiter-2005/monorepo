import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DBConfig } from './db.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forRoot(DBConfig)],
})
export class AppModule {}
