import { useEffect, useState } from 'react';

import { connectSocket } from '../client/connectSocket';
import { WS_URL } from '../constants/WsUrls';
import { formatPrice } from '../helpers/formatPrice';

type Props = {
  symbol: string;
  price: string;
  priceChange: number;
};

type TickerData = {
  s: string;
  c: string;
  P: number;
};

export function useTicker(currency: string): Props {
  const [symbol, setSymbol] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [priceChange, setPriceChange] = useState<number>(0);

  useEffect(() => {
    const tradesSocket = connectSocket<TickerData>(`${WS_URL}/${currency}usdt@ticker`, (data) => {
      setSymbol(data.s);
      setPrice(formatPrice(data.c, 2));
      setPriceChange(data.P);
    });

    return (): void => {
      tradesSocket.close();
    };
  }, [currency]);

  return {
    symbol,
    price,
    priceChange,
  };
}
