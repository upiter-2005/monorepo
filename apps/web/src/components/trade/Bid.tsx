import { PRICE_COLORS } from '../../constants/priceColors';
import { formatPrice, multipleFormatPrice } from '../../helpers/formatPrice';
import { useWsPrices } from '../../hooks/useWsPrices';
import { useAppDispatch } from '../../store/trade/hooks';
import { setClickPrice } from '../../store/trade/slices/activePairSlice';

export const Bid: React.FC = () => {
  const { bids } = useWsPrices();

  const dispatch = useAppDispatch();

  const filteredAskBid = bids.reverse();

  return filteredAskBid.map((el, i) => (
    <li
      key={i + el[0]}
      className={`${PRICE_COLORS.GREEN} text-xs p-1 hover:bg-gray-700 cursor-pointer flex justify-between gap-1.5`}
      onClick={(e) => dispatch(setClickPrice(formatPrice(el[0], 2)))}
    >
      <span className="w-[33%]">{formatPrice(el[0], 2)}</span>
      <span className="w-[33%]">{formatPrice(el[1], 5)}</span>
      <span className="w-[33%] text-right">
        {formatPrice(multipleFormatPrice(el[0], el[1]), 2)}
      </span>
    </li>
  ));
};
