import { useEffect, useState } from 'react';

import { WS_URL } from '../constants/WsUrls';
import { formatPrice } from '../helpers/formatPrice';

type UseWSTickerProps = {
  symbol: string;
  price: string;
  priceChange: number;
};

export function useWsTicker(currency: string): UseWSTickerProps {
  const [symbol, setSymbol] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [priceChange, setPriceChange] = useState<number>(0);

  useEffect(() => {
    const ticker = new WebSocket(`${WS_URL}/${currency}usdt@ticker`);

    ticker.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      setSymbol(data.s);
      setPrice(formatPrice(data.c, 2));
      setPriceChange(data.P);
    });

    return (): void => {
      ticker.close();
    };
  }, [currency]);

  return {
    symbol,
    price,
    priceChange,
  };
}
