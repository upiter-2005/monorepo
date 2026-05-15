import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { BalanceCreateDto, BalanceReturnDto } from './balance.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request } from 'express';
import { BalanceService } from './balance.service';
import { EMPTY_BALANCE } from '../constants/trade';

type RequestWithUser = Request & {
  user: {
    userId: string;
    email: string;
    role: string;
  };
};

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getBalance(
    @Req() req: RequestWithUser,
    @Query('currency') currency: string,
  ): Promise<BalanceReturnDto | null> {
    const { userId } = req.user;
    const balance = await this.balanceService.findBalanceByCurrency(userId, currency);

    if (!balance) {
      return {
        currency,
        amount: EMPTY_BALANCE,
      };
    }
    return balance;
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createBalance(
    @Body() payload: BalanceCreateDto,
    @Req() req: RequestWithUser,
  ): Promise<BalanceReturnDto> {
    const { userId } = req.user;
    return this.balanceService.createBalance(payload, userId);
  }
}
