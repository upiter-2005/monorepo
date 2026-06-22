import Slider from '@mui/material/Slider';
import { PAIR_ORDER_TYPE } from '@org/constants';
import { useTranslation } from 'react-i18next';

import { PriceInput } from './PriceInput';
import { MARKS } from '../../constants/marks';
import { useBalanceHandler } from '../../hooks/useBalanceHandler';
import { useTrade } from '../../hooks/useTrade';
import { TradeButton } from '../../share/ui/TradeButton';
import { useAppSelector } from '../../store/trade/hooks';
import { useGetBalanceQuery } from '../../store/trade/tradeApi';
import { UserUsdtBalance } from '../users/UserUsdtBalance';

export const Buy: React.FC = () => {
  const { currency, exchangeTo, clickPrice } = useAppSelector((state) => state.activePair);
  const { data: exchangeToAmount, isError } = useGetBalanceQuery(exchangeTo);

  const { t } = useTranslation();

  const { amount, sliderValueHandler, changeClickedPrice } = useTrade(
    exchangeToAmount?.amount,
    PAIR_ORDER_TYPE.BUY,
  );
  const { onTrade } = useBalanceHandler(amount, null);

  return (
    <div className="w-full bg-[#181A20] p-3 rounded-lg">
      <div className="flex justify-between">
        <span>{t('trade_page.avlv')}</span>
        <div className="flex gap-2">
          {t('trade_page.balance')} <UserUsdtBalance />
        </div>
      </div>

      <PriceInput
        id="price_field_buy"
        type="number"
        title={t('trade_page.price')}
        clickPrice={clickPrice}
        coin={exchangeTo}
        disabled={false}
        handler={(value) => changeClickedPrice(value)}
      />

      <PriceInput
        id="amount_field_buy"
        type="number"
        title={t('trade_page.amount')}
        clickPrice={String(amount)}
        coin={currency}
      />

      <Slider
        className="text-white"
        aria-label="Custom marks"
        defaultValue={0}
        step={1}
        valueLabelDisplay="auto"
        marks={MARKS}
        onChangeCommitted={(_, value: number) => {
          sliderValueHandler(value);
        }}
      />

      <TradeButton
        type={PAIR_ORDER_TYPE.BUY}
        currency={currency}
        disabled={isError}
        handler={(type) => onTrade(type)}
        label={t('trade_page.buy')}
      />
    </div>
  );
};
