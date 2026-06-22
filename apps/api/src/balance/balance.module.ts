import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Balance } from './balance.entity';
import { BalanceController } from './balance.controller';
import { BalanceRepository } from './balance.repository';
import { BalanceService } from './balance.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Balance]),
  ],
  controllers: [BalanceController],
  providers: [BalanceService, BalanceRepository],
  exports: [BalanceService, BalanceRepository],
})
export class BalanceModule {}
