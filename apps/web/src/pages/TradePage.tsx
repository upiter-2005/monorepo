import { useEffect } from 'react';

import { Currencies } from '@org/types';
import { useParams } from 'react-router-dom';

import { Ask } from '../components/trade/Ask';
import { Bid } from '../components/trade/Bid';
import { Buy } from '../components/trade/Buy';
import { ChartWidget } from '../components/trade/Chart';
import { CurrencyList } from '../components/trade/CurrencyList';
import { OrdersList } from '../components/trade/OrderList';
import { PriceMoving } from '../components/trade/PriceMoving';
import { Sell } from '../components/trade/Sell';
import { useAppDispatch } from '../store/trade/hooks';
import { setCurrency } from '../store/trade/slices/activePairSlice';

const Trade: React.FC = () => {
  const { pair } = useParams<{ pair: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pair) {
      dispatch(
        setCurrency({
          currency: pair?.replace('usdt', '') as Currencies,
          exchangeTo: 'usdt',
        }),
      );
    } else {
      dispatch(
        setCurrency({
          currency: 'btc',
          exchangeTo: 'usdt',
        }),
      );
    }
  }, [pair]);

  return (
    <>
      <div className="w-full max-w-[1430px] m-auto flex gap-4">
        <div className="w-[330px] flex flex-col">
          <ul className="border border-[#e3e3e3] h-[340px] overflow-y-scroll bg-[#181A20] rounded-lg custom-scrollbar">
            <Ask />
          </ul>
          <PriceMoving />
          <ul className="border border-[#e3e3e3] h-[340px] overflow-y-scroll bg-[#181A20] rounded-lg custom-scrollbar">
            <Bid />
          </ul>
        </div>
        <div className="flex-1 text-xs">
          <ChartWidget />
          <div className="flex gap-3 mb-4">
            <Buy />
            <Sell />
          </div>
        </div>
        <div className="w-[330px]">
          <ul className="border border-[#e3e3e3]">
            <CurrencyList />
          </ul>
        </div>
      </div>

      <OrdersList />
    </>
  );
};

export default Trade;
