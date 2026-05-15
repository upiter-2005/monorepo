import type { Currencies } from '@org/types';
import { IsIn, IsString, IsNumber } from 'class-validator';

export class BalanceCreateDto {
  @IsIn([
    'btc',
    'eth',
    'ton',
    'ltc',
    'not',
    '1inch',
    'neo',
    'dogs',
    'xrp',
    'dot',
    'bnb',
    'qtum',
    'chz',
    'link',
    'rvn',
    'ada',
    'avax',
    'rune',
    'vet',
    'near',
    'sol',
    'usdt',
  ])
  currency: Currencies;

  @IsNumber({ message: 'amount should be a number' })
  amount: number;
}

export class BalanceReturnDto {
  @IsString()
  currency: string;

  @IsNumber({ message: 'amount should be a number' })
  amount: number;
}
