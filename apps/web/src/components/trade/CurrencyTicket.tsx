import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';
import { useWsTicker } from '../../hooks/useWsTicker';
import { useAppDispatch } from '../../store/trade/hooks';
import { setCurrency } from '../../store/trade/slices/activePairSlice';

type CurrencyTicketProps = {
  currency: string;
};

export const CurrencyTicket: React.FC<CurrencyTicketProps> = ({ currency }) => {
  const { symbol, price, priceChange } = useWsTicker(currency);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  return (
    <div
      className="flex justify-between w-full px-2 cursor-pointer"
      onClick={() => {
        dispatch(setCurrency({ currency, exchangeTo: 'usdt' }));
        navigate(`${ROUTES.TRADE}/${currency}usdt`);
      }}
    >
      <div>
        <span>{symbol}</span>
      </div>
      <div className={``}>{price}</div>
      <div>{priceChange}%</div>
    </div>
  );
};
