import { useEffect, useState } from 'react';

import { DEFAULT_EXCHANGE, PRICE_COLORS } from '@org/constants';
import { CandlesColors, Currencies } from '@org/types';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';
import { useTicker } from '../../hooks/useTicker';
import { useAppDispatch } from '../../store/trade/hooks';
import { setCurrency } from '../../store/trade/slices/activePairSlice';

type CurrencyTicketProps = {
  currency: Currencies;
};

export const CurrencyTicket: React.FC<CurrencyTicketProps> = ({ currency }) => {
  const { symbol, price, priceChange } = useTicker(currency);
  const dispatch = useAppDispatch();

  const [textColor, setTextColor] = useState<CandlesColors>();

  const navigate = useNavigate();

  const onPairClick = (): void => {
    dispatch(setCurrency({ currency, exchangeTo: DEFAULT_EXCHANGE }));
    navigate(`${ROUTES.TRADE}/${currency}${DEFAULT_EXCHANGE}`);
  };

  const checkMinusSign = (value: number): boolean => value.toString().includes('-');

  useEffect(() => {
    if (checkMinusSign(priceChange)) {
      setTextColor(PRICE_COLORS.RED);
    } else {
      setTextColor(PRICE_COLORS.GREEN);
    }
  }, [priceChange]);

  return (
    <div
      className="flex justify-between w-full text-[#afafaf] px-2 cursor-pointer text-sm hover:bg-[#a1a1a1] hover:text-[#fff]"
      onClick={onPairClick}
    >
      <div>
        <span>{symbol}</span>
      </div>
      <div className="text-right w-[90px] text-[#afafaf]">{price}</div>
      <div className={`${textColor} w-[80px] text-right`}>{priceChange}%</div>
    </div>
  );
};
