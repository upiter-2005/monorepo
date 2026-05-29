import { PAIR_ORDER_STATUS, PAIR_ORDER_TYPE } from '@org/constants';
import { OrderItemType } from '@org/types';

import { PRICE_COLORS } from '../../constants/priceColors';

type OrderItemProps = {
  order: OrderItemType;
};

export const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const total = order.price * order.amount;
  const typeColor = order.type === PAIR_ORDER_TYPE.BUY ? PRICE_COLORS.GREEN : PRICE_COLORS.RED;
  const statusColor =
    order.status === PAIR_ORDER_STATUS.DONE ? PRICE_COLORS.GREEN : PRICE_COLORS.YELLOW;

  return (
    <div className="grid grid-cols-[1.2fr_0.7fr_1fr_1fr_1fr_1fr_1.2fr] items-center px-3 py-2 hover:bg-[#1E2329]">
      <div className="font-medium text-gray-200 uppercase">{order.pair}</div>

      <div className={typeColor}>{order.type.toUpperCase()}</div>
      <div className="text-right">{order.price.toFixed(2)}</div>
      <div className="text-right">{order.amount}</div>
      <div className="text-right">{total.toFixed(2)}</div>
      <div className={`text-right ${statusColor}`}>{order.status}</div>
      <div className="text-right text-gray-500">{order.time}</div>
    </div>
  );
};
