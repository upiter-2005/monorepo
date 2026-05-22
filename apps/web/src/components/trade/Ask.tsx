import { PRICE_COLORS } from '@org/constants';

import { formatPrice, multipleFormatPrice } from '../../helpers/formatPrice';
import { useAppDispatch } from '../../store/trade/hooks';
import { setClickPrice } from '../../store/trade/slices/activePairSlice';

type AskProps = {
  price: string;
  amount: string;
};
export const Ask: React.FC<AskProps> = ({ price, amount }) => {
  const dispatch = useAppDispatch();

  return (
    <li
      className={`${PRICE_COLORS.RED} text-xs p-1 hover:bg-gray-700 cursor-pointer flex gap-1.5`}
      onClick={(e) => dispatch(setClickPrice(formatPrice(price, 2)))}
    >
      <span className="w-[33%]">{formatPrice(price, 2)}</span>
      <span className="w-[33%]">{formatPrice(amount, 5)}</span>
      <span className="w-[33%] text-right">
        {formatPrice(multipleFormatPrice(price, amount), 2)}
      </span>
    </li>
  );
};
