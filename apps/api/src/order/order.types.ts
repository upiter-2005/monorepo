import { OrderStatus, OrderType } from '@org/types';

export type OrderPayload = {
  user_id: string;
  pair: string;
  price: number;
  amount: number;
  type: OrderType;
  status: OrderStatus;
};
