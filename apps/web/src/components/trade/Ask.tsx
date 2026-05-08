import { useWsPrices } from '../../hooks/useWsPrices';

export const Ask: React.FC = () => {
  const { asks } = useWsPrices();

  return <>{asks}</>;
};
