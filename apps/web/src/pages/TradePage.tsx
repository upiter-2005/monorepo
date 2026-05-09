import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Ask } from '../components/trade/Ask';
import { Bid } from '../components/trade/Bid';
import { ChartWidget } from '../components/trade/Chart';
import { Currencies } from '../components/trade/Currencies';
import { PriceMoving } from '../components/trade/PriceMoving';
import { useAppDispatch } from '../store/trade/hooks';
import { setCurrency } from '../store/trade/slices/activePairSlice';

const Trade: React.FC = () => {
  const { pair } = useParams<{ pair: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pair) {
      dispatch(
        setCurrency({
          currency: pair?.replace('usdt', ''),
          exchangeTo: 'usdt',
        }),
      );
    }
  }, [pair]);

  return (
    <div className="w-full max-w-[1230px] m-auto flex gap-4">
      <div className="w-[330px] flex flex-col">
        <ul className="border border-[#e3e3e3] h-[250px] overflow-y-scroll">
          <Ask />
        </ul>
        <PriceMoving />
        <ul className="border border-[#e3e3e3] h-[250px] overflow-y-scroll">
          <Bid />
        </ul>
      </div>
      <div className="flex-1">
        <ChartWidget />
      </div>
      <div className="w-[330px]">
        <ul className="border border-[#e3e3e3]">
          <Currencies />
        </ul>
      </div>
    </div>
  );
};

export default Trade;
