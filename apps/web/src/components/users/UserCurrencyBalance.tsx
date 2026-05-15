import { Currencies } from '@org/types';

import { useGetBalanceQuery } from '../../store/trade/tradeApi';

type UserCurrencyBalanceType = {
  currency: Currencies;
};
export const UserCurrencyBalance: React.FC<UserCurrencyBalanceType> = ({ currency }) => {
  const { data: balance, isLoading, isError } = useGetBalanceQuery(currency);

  if (isLoading) {
    return <div>Loading balance...</div>;
  }

  if (isError) {
    return <div>0</div>;
  }

  return (
    <div>
      {balance?.amount.toFixed(4)} {currency}
    </div>
  );
};
