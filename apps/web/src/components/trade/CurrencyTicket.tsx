import { useEffect, useState } from 'react';

import { Currencies } from '@org/types';
import { useNavigate } from 'react-router-dom';

import { PRICE_COLORS } from '../../constants/priceColors';
import { ROUTES } from '../../constants/routes';
import { useWsTicker } from '../../hooks/useWsTicker';
import { useAppDispatch } from '../../store/trade/hooks';
import { setCurrency } from '../../store/trade/slices/activePairSlice';

type CurrencyTicketProps = {
  currency: Currencies;
};

export const CurrencyTicket: React.FC<CurrencyTicketProps> = ({ currency }) => {
  const { symbol, price, priceChange } = useWsTicker(currency);
  const dispatch = useAppDispatch();

  const [textColor, setTextColor] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    if (priceChange.toString().includes('-')) {
      setTextColor(PRICE_COLORS.RED);
    } else {
      setTextColor(PRICE_COLORS.GREEN);
    }
  }, [priceChange]);

  return (
    <div
      className="flex justify-between w-full text-[#afafaf] px-2 cursor-pointer text-sm hover:bg-[#a1a1a1] hover:text-[#fff]"
      onClick={() => {
        dispatch(setCurrency({ currency, exchangeTo: 'usdt' }));
        navigate(`${ROUTES.TRADE}/${currency}usdt`);
      }}
    >
      <div>
        {' '}
        <span>{symbol}</span>{' '}
      </div>
      <div className="text-right w-[90px] text-[#afafaf]">{price}</div>
      <div className={`${textColor} w-[80px] text-right`}>{priceChange}%</div>
    </div>
  );
};
