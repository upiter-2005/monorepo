import { useGetBalanceQuery } from '../../store/trade/tradeApi';

export const UserUsdtBalance: React.FC = () => {
  const { data: balance, isLoading, isError } = useGetBalanceQuery('usdt');

  if (isLoading) {
    return <div>Loading balance...</div>;
  }

  if (isError) {
    return <div>0</div>;
  }

  return <div>{balance?.amount.toFixed(2)} USDT</div>;
};
