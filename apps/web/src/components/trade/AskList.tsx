import { Ask } from './Ask';
import { usePrices } from '../../hooks/usePrices';

export const AskList: React.FC = () => {
  const { asks } = usePrices();

  const filteredAskBid = asks;

  return filteredAskBid.map((el, i) => <Ask key={i + el[0]} amount={el[1]} price={el[0]} />);
};
