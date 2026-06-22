import { PAIR_ORDER_STATUS } from '@org/constants';
import { OrderStatus, OrderType } from '@org/types';

type OrderPayload = {
  pair: string;
  price: number;
  amount: number;
  type: OrderType;
  status: OrderStatus;
};

export const createOrderPayload = (
  currency: string,
  exchangeTo: string,
  price: string,
  amount: number,
  orderType: OrderType,
): OrderPayload => {
  return {
    pair: `${currency}/${exchangeTo}`,
    price: Number(price),
    amount,
    type: orderType,
    status: PAIR_ORDER_STATUS.PENDING,
  };
};
