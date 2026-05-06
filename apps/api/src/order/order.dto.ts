import { OrderStatus, OrderType } from '@org/types';
import { IsIn, IsString, IsDate, IsNumber } from 'class-validator';
import { extname } from 'path';

export class OrderCreateDto {
  @IsString({ message: 'pair should be a string' })
  pair: string;

  @IsNumber({ message: 'price should be a number' })
  price: number;

  @IsNumber({ message: 'amount should be a number' })
  amount: number;

  @IsString({ message: 'type should be a string' })
  @IsIn(['buy', 'sell'])
  type: OrderType;

  @IsString({ message: 'type should be a string' })
  @IsIn(['pending', 'done'])
  status: OrderStatus;
}

export class OrdersReturnDto extends OrderCreateDto {
  @IsString({ message: 'Id should be a string' })
  id: string;

  @IsDate()
  time: Date;
}
