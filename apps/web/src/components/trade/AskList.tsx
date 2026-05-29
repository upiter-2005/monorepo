import { ASK } from '@org/constants';

import { AskBid } from './AskBid';
import { usePrices } from '../../hooks/usePrices';

export const AskList: React.FC = () => {
  const { asks } = usePrices();

  return (
    <ul className="border border-[#e3e3e3] h-[340px] overflow-y-scroll bg-[#181A20] rounded-lg custom-scrollbar">
      {asks.map((el, i) => (
        <AskBid key={i + el[0]} amount={el[1]} price={el[0]} type={ASK} />
      ))}
    </ul>
  );
};
