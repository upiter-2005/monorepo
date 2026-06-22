import { Injectable } from '@nestjs/common';

import { BalanceRepository } from './balance.repository';
import { BalancePayload, BalanceReturn } from './balance.types';

@Injectable()
export class BalanceService {
  constructor(private balanceRepository: BalanceRepository) {}

  async findBalanceByCurrency(userId: string, currency: string): Promise<BalanceReturn | null> {
    return this.balanceRepository.findOneBy(userId, currency);
  }

  async createBalance(payload: BalancePayload, userId: string): Promise<BalanceReturn> {
    const balance = await this.balanceRepository.findOneBy(userId, payload.currency);

    if (balance) {
      return this.balanceRepository.updateBalance(payload, balance.id);
    }

    return this.balanceRepository.create(payload, userId);
  }
}
