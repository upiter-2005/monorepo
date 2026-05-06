import { OrderStatus, OrderType } from '@org/types';
import { Order } from './order.entity';

export type OrderPayload = {
  user_id: string;
  pair: string;
  price: number;
  amount: number;
  type: OrderType;
  status: OrderStatus;
};

export type OrdersReturn = Pick<
  Order,
  'id' | 'pair' | 'price' | 'amount' | 'status' | 'time' | 'type'
>;
