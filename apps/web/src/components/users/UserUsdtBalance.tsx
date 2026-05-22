import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../store/trade/hooks';
import { useGetBalanceQuery } from '../../store/trade/tradeApi';

export const UserUsdtBalance: React.FC = () => {
  const { exchangeTo } = useAppSelector((state) => state.activePair);
  const { data: balance, isLoading, isError } = useGetBalanceQuery(exchangeTo);

  const { t } = useTranslation();

  if (isLoading) {
    return <div>{t('trade_page.loading')}</div>;
  }

  if (isError) {
    return <div>0</div>;
  }

  return (
    <div className="uppercase">
      {balance?.amount.toFixed(2)} {exchangeTo}
    </div>
  );
};
