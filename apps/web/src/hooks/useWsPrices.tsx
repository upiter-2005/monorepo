import { JSX, useEffect, useState } from 'react';

import { TRADE_TYPE } from '@org/constants';

import { WS_URL } from '../constants/WsUrls';
import { formatPrice } from '../helpers/formatPrice';
import { mappingAskBid } from '../helpers/mappingAskBid';
import { useAppSelector } from '../store/trade/hooks';

type UseWSPricesProps = {
  asks: JSX.Element[];
  bids: JSX.Element[];
  priceMoving: number;
  loading: boolean;
};

export function useWsPrices(): UseWSPricesProps {
  const [asks, setAsks] = useState<JSX.Element[]>([]);
  const [bids, setBids] = useState<JSX.Element[]>([]);
  const [priceMoving, setPricMoving] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { currency, exchangeTo } = useAppSelector((state) => state.activePair);

  useEffect(() => {
    setLoading(false);
    const trades = new WebSocket(`${WS_URL}/${currency + exchangeTo}@depth20@1000ms`);

    trades.addEventListener('message', (e) => {
      const response = JSON.parse(e.data);
      const mappedAsks = mappingAskBid(response.asks, TRADE_TYPE.ASK);
      setAsks(mappedAsks);
      const mappedBids = mappingAskBid(response.bids, TRADE_TYPE.BID);
      setBids(mappedBids);
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
