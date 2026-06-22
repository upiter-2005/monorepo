import { OrderItem } from './OrderItem';
import { useGetOrdersQuery } from '../../store/trade/tradeApi';

export const OrdersList: React.FC = () => {
  const { data: orders } = useGetOrdersQuery();

  return (
    <div className="w-full rounded-md bg-[#181A20] text-xs text-gray-300">
      <div className="grid grid-cols-[1.2fr_0.7fr_1fr_1fr_1fr_1fr_1.2fr] border-b border-[#2B3139] px-3 py-2 text-gray-500">
        <div>Pair</div>
        <div>Type</div>
        <div className="text-right">Price</div>
        <div className="text-right">Amount</div>
        <div className="text-right">Total</div>
        <div className="text-right">Status</div>
        <div className="text-right">Date</div>
      </div>

      <div className="max-h-[320px] overflow-y-auto">
        {orders?.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};
