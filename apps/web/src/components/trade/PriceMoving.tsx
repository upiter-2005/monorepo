import { useEffect, useState } from 'react';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { PRICE_COLORS, PRICE_MOVING } from '../../constants/priceColors';
import { useWsPrices } from '../../hooks/useWsPrices';

type PriceMoving = 'up' | 'down';

export const PriceMoving: React.FC = () => {
  const { priceMoving } = useWsPrices();
  const [currentPrice, setCurrentPrice] = useState(priceMoving);
  const [textColor, setTextColor] = useState<string>('');
  const [icon, setIcon] = useState<PriceMoving>();

  useEffect(() => {
    if (currentPrice > Number(priceMoving)) {
      setTextColor(PRICE_COLORS.RED);
      setIcon(PRICE_MOVING.DOWN);
    } else {
      setTextColor(PRICE_COLORS.GREEN);
      setIcon(PRICE_MOVING.UP);
    }
    setCurrentPrice(priceMoving);
  }, [priceMoving]);

  return (
    <div className={`${textColor} text-3xl font-bold flex items-center`}>
      {priceMoving}
      <span className="font-bold">
        {icon === PRICE_MOVING.UP ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
      </span>
    </div>
  );
};
