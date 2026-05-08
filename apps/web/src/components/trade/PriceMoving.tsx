import { JSX, useEffect, useState } from 'react';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { PRICE_COLORS } from '../../constants/priceColors';
import { useWsPrices } from '../../hooks/useWsPrices';

export const PriceMoving: React.FC = () => {
  const { priceMoving } = useWsPrices();
  const [currentPrice, setCurrentPrice] = useState(priceMoving);
  const [textColor, setTextColor] = useState<string>('');
  const [icon, setIcon] = useState<JSX.Element>();

  useEffect(() => {
    if (currentPrice > Number(priceMoving)) {
      setTextColor(PRICE_COLORS.RED);
      setIcon(<ArrowDownwardIcon />);
    } else {
      setTextColor(PRICE_COLORS.GREEN);
      setIcon(<ArrowUpwardIcon />);
    }
    setCurrentPrice(priceMoving);
  }, [priceMoving]);

  return (
    <div className={`${textColor} text-3xl font-bold flex items-center`}>
      {priceMoving}
      <span className={` font-bold`}>{icon}</span>
    </div>
  );
};
