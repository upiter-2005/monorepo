import { OrderItemType } from '@org/types';

type OrderItemProps = {
  order: OrderItemType;
};

export const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const total = order.price * order.amount;
  const typeColor = order.type === 'buy' ? 'text-green-500' : 'text-red-500';
  const statusColor = order.status === 'done' ? 'text-green-500' : 'text-yellow-500';

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
