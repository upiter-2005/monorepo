import { OrderStatus, OrderType } from '@org/types';
import { Order } from './order.entity';

export type OrderPayload = {
  pair: string;
  price: number;
  amount: number;
  type: OrderType;
  status: OrderStatus;
  placedAt?: Date;
};

export type OrderResponse = Omit<Order, 'user_id' | 'user'>;
