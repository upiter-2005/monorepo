import { PRICE_COLORS } from '@org/constants';
import { TradeType } from '@org/types';

import { formatPrice, multipleFormatPrice } from '../../helpers/formatPrice';
import { useAppDispatch } from '../../store/trade/hooks';
import { setClickPrice } from '../../store/trade/slices/activePairSlice';

type AskBidProps = {
  price: string;
  amount: string;
  type: TradeType;
};
export const AskBid: React.FC<AskBidProps> = ({ price, amount, type }) => {
  const dispatch = useAppDispatch();

  const textColor = type === 'ask' ? PRICE_COLORS.RED : PRICE_COLORS.GREEN;

  return (
    <li
      className={`${textColor} text-xs p-1 hover:bg-gray-700 cursor-pointer flex gap-1.5`}
      onClick={() => dispatch(setClickPrice(formatPrice(price, 2)))}
    >
      <span className="w-[33%]">{formatPrice(price, 2)}</span>
      <span className="w-[33%]">{formatPrice(amount, 5)}</span>
      <span className="w-[33%] text-right">
        {formatPrice(multipleFormatPrice(price, amount), 2)}
      </span>
    </li>
  );
};
