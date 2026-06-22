import type { Currencies } from '@org/types';
import { IsIn, IsString, IsNumber } from 'class-validator';
import { CURRENCIES } from '../constants/currencies';

export class BalanceCreateDto {
  @IsIn(CURRENCIES)
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
