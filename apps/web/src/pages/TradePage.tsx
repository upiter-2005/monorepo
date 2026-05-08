import { useParams } from 'react-router-dom';

import { Ask } from '../components/trade/Ask';
import { Bid } from '../components/trade/Bid';
import { PriceMoving } from '../components/trade/PriceMoving';

const Trade: React.FC = () => {
  const { pair } = useParams<{ pair: string }>();

  return (
    <div className="w-full max-w-[1230px] m-auto flex gap-4">
      <div className="w-[330px] flex flex-col">
        <Ask />
        <PriceMoving />
        <Bid />
      </div>
      <div className="flex-1">{pair}</div>
      <div className="w-[330px]">3</div>
    </div>
  );
};

export default Trade;
