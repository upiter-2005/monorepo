import { useEffect } from 'react';

import { Currencies } from '@org/types';
import { useParams } from 'react-router-dom';

import { AskList } from '../components/trade/AskList';
import { BidList } from '../components/trade/BidList';
import { Buy } from '../components/trade/Buy';
import { ChartWidget } from '../components/trade/Chart';
import { CurrencyList } from '../components/trade/CurrencyList';
import { OrdersList } from '../components/trade/OrderList';
import { PriceMoving } from '../components/trade/PriceMoving';
import { Sell } from '../components/trade/Sell';
import { useAppDispatch } from '../store/trade/hooks';
import { setCurrency } from '../store/trade/slices/activePairSlice';
import { DEFAULT_CURRENCY, DEFAULT_EXCHANGE } from '@org/constants';

type Pair = {
  pair: string;
};
const Trade: React.FC = () => {
  const { pair } = useParams<Pair>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setCurrency(
        pair
          ? {
              currency: pair?.replace(DEFAULT_EXCHANGE, '') as Currencies,
              exchangeTo: DEFAULT_EXCHANGE,
            }
          : {
              currency: DEFAULT_CURRENCY,
              exchangeTo: DEFAULT_EXCHANGE,
            },
      ),
    );
  }, [pair]);

  return (
    <>
      <div className="w-full max-w-[1430px] m-auto flex gap-4">
        <div className="w-[330px] flex flex-col">
          <AskList />
          <PriceMoving />
          <BidList />
        </div>
        <div className="flex-1 text-xs">
          <ChartWidget />
          <div className="flex gap-3 mb-4">
            <Buy />
            <Sell />
          </div>
        </div>
        <div className="w-[330px]">
          <CurrencyList />
        </div>
      </div>

      <OrdersList />
    </>
  );
};

export default Trade;
