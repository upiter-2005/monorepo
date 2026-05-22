import { useEffect, useState } from 'react';

import { Pair } from '@org/types';

import { connectSocket } from '../client/connectSocket';
import { WS_URL } from '../constants/WsUrls';
import { formatPrice } from '../helpers/formatPrice';
import { useAppSelector } from '../store/trade/hooks';

type Props = {
  asks: Pair[];
  bids: Pair[];
  priceMoving: number;
  loading: boolean;
};

export function usePrices(): Props {
  const [asks, setAsks] = useState<Pair[]>([]);
  const [bids, setBids] = useState<Pair[]>([]);
  const [priceMoving, setPricMoving] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { currency, exchangeTo } = useAppSelector((state) => state.activePair);

  useEffect(() => {
    setLoading(false);

    const tradesSocket = connectSocket<{ asks: Pair[]; bids: Pair[] }>(
      `${WS_URL}/${currency + exchangeTo}@depth20@1000ms`,
      (data) => {
        setAsks(data.asks);
        setBids([...data.bids].reverse());
        setLoading(true);
      },
    );

    const priceSocket = connectSocket<{ p: string }>(
      `${WS_URL}/${currency + exchangeTo}@trade`,
      (data) => {
        const roundPrice = formatPrice(data.p, 2);
        setPricMoving(Number(roundPrice));
      },
    );

    return (): void => {
      tradesSocket.close();
      priceSocket.close();
    };
  }, [currency, exchangeTo]);

  return {
    asks,
    bids,
    priceMoving,
    loading,
  };
}
