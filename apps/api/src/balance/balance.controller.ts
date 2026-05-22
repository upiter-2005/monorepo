import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { BalanceCreateDto, BalanceReturnDto } from './balance.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BalanceService } from './balance.service';
import { EMPTY_BALANCE } from '../constants/trade';
import { User } from '../user/user.decorator';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getBalance(
    @User('userId') userId: string,
    @Query('currency') currency: string,
  ): Promise<BalanceReturnDto> {
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
    @User('userId') userId: string,
  ): Promise<BalanceReturnDto> {
    return this.balanceService.createBalance(payload, userId);
  }
}
