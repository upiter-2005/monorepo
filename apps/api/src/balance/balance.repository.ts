import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from './balance.entity';
import { BalancePayload } from './balance.types';

@Injectable()
export class BalanceRepository {
  constructor(
    @InjectRepository(Balance)
    private readonly repository: Repository<Balance>,
  ) {}

  async findOneBy(userId: string, currency: string): Promise<Balance | null> {
    return this.repository.findOneBy({ user_id: userId, currency });
  }

  async create(payload: BalancePayload, userId: string): Promise<Balance> {
    const { currency, amount } = payload;
    const balance = this.repository.create({
      currency,
      amount,
      user_id: userId,
    });

    return this.repository.save(balance);
  }

  async updateBalance(payload: BalancePayload, balanceId: string): Promise<Balance> {
    const balance = await this.repository.findOneOrFail({
      where: {
        id: balanceId,
      },
    });

    balance.amount = payload.amount;

    return this.repository.save(balance);
  }
}
