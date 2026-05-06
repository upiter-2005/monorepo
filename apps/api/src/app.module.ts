import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DBConfig } from './db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { moduleConfig } from './module.config';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(moduleConfig),
    UserModule,
    AuthModule,
    OrderModule,
    TypeOrmModule.forRoot(DBConfig),
  ],
})
export class AppModule {}
