import { useEffect, useState } from 'react';

import { WS_URL } from '../constants/WsUrls';
import { formatPrice } from '../helpers/formatPrice';
import { useAppSelector } from '../store/trade/hooks';

type AskBidData = [string, string];

type UseWSPricesProps = {
  asks: AskBidData[];
  bids: AskBidData[];
  priceMoving: number;
  loading: boolean;
};

export function useWsPrices(): UseWSPricesProps {
  const [asks, setAsks] = useState<AskBidData[]>([]);
  const [bids, setBids] = useState<AskBidData[]>([]);
  const [priceMoving, setPricMoving] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { currency, exchangeTo } = useAppSelector((state) => state.activePair);

  useEffect(() => {
    setLoading(false);
    const trades = new WebSocket(`${WS_URL}/${currency + exchangeTo}@depth20@1000ms`);

    trades.addEventListener('message', (e) => {
      const response = JSON.parse(e.data);
      setAsks(response.asks);
      setBids(response.bids);
      setLoading(true);
    });

    const priceSocket = new WebSocket(`${WS_URL}/${currency + exchangeTo}@trade`);

    priceSocket.addEventListener('message', (e) => {
      const res = JSON.parse(e.data);
      const roundPrice = formatPrice(res.p, 2);
      setPricMoving(Number(roundPrice));
    });

    return (): void => {
      trades.close();
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
