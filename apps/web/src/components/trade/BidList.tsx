import { Bid } from './Bid';
import { usePrices } from '../../hooks/usePrices';

export const BidList: React.FC = () => {
  const { bids } = usePrices();

  const filteredAskBid = bids;

  return filteredAskBid.map((el, i) => <Bid key={i + el[0]} price={el[0]} amount={el[1]} />);
};
