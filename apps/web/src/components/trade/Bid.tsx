import { useWsPrices } from '../../hooks/useWsPrices';

export const Bid: React.FC = () => {
  const { bids } = useWsPrices();

  return <>{bids}</>;
};
