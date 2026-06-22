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
import { UserCurrencyBalance } from '../users/UserCurrencyBalance';

export const Sell: React.FC = () => {
  const { currency, exchangeTo, clickPrice } = useAppSelector((state) => state.activePair);

  const { data: currencyAmount, isError } = useGetBalanceQuery(currency);

  const { t } = useTranslation();

  const { amount, amountForSell, sliderValueHandler, changeClickedPrice } = useTrade(
    currencyAmount?.amount,
    PAIR_ORDER_TYPE.SELL,
  );
  const { onTrade } = useBalanceHandler(amount, amountForSell);

  return (
    <div className="w-full bg-[#181A20] p-3 rounded-lg">
      <div className="flex justify-between">
        <span>{t('trade_page.avlv')}</span>
        <div className="flex gap-2">
          {t('trade_page.balance')} <UserCurrencyBalance currency={currency} />
        </div>
      </div>

      <PriceInput
        id="price_field_sell"
        type="number"
        title={t('trade_page.price')}
        clickPrice={clickPrice}
        coin={currency}
        disabled={false}
        handler={(value) => changeClickedPrice(value)}
      />

      <PriceInput
        id="sellAmount"
        type="number"
        title={t('trade_page.price')}
        clickPrice={amount}
        coin={exchangeTo}
        disabled={true}
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
        type={PAIR_ORDER_TYPE.SELL}
        currency={currency}
        disabled={isError}
        handler={(type) => onTrade(type)}
        label={t('trade_page.sell')}
      />
    </div>
  );
};
