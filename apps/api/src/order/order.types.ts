import { OrderStatus, OrderType } from '@org/types';
import { Order } from './order.entity';

export type OrderPayload = {
  userId: string;
  pair: string;
  price: number;
  amount: number;
  type: OrderType;
  status: OrderStatus;
  time?: Date;
};

export type OrderReturn = Omit<Order, 'user_id' | 'user'>;
