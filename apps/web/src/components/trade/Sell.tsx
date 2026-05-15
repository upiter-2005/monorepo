import Slider from '@mui/material/Slider';
import { PAIR_ORDER_TYPE } from '@org/constants';

import { MARKS } from '../../constants/marks';
import { useBalanceHandler } from '../../hooks/useBalanceHandler';
import { useTrade } from '../../hooks/useTrade';
import { Input } from '../../share/ui/Input';
import { useAppSelector } from '../../store/trade/hooks';
import { useGetBalanceQuery } from '../../store/trade/tradeApi';
import { UserCurrencyBalance } from '../users/UserCurrencyBalance';

export const Sell: React.FC = () => {
  const { currency, exchangeTo, clickPrice } = useAppSelector((state) => state.activePair);

  const { data: currencyAmount, isError } = useGetBalanceQuery(currency);

  const { amount, amountForSell, sliderValueHandler, changeClickedPrice } = useTrade(
    currencyAmount?.amount,
    PAIR_ORDER_TYPE.SELL,
  );
  const { trade } = useBalanceHandler(amount, amountForSell);

  return (
    <div className="w-full bg-[#181A20] p-3 rounded-lg">
      <div className="flex justify-between">
        <span>Avlb</span>
        <div className="flex gap-2">
          my balance <UserCurrencyBalance currency={currency} />
        </div>
      </div>
      <div className="flex gap-3 w-full bg-[#555] items-center px-2">
        <div>Price</div>

        <Input
          name="priceSell"
          type="number"
          id="price_field_sell"
          value={clickPrice}
          onChange={(e) => changeClickedPrice(e.target.value)}
        />
        <div className="">
          <label htmlFor="">USDT</label>
        </div>
      </div>

      <div className="flex gap-3 w-full bg-[#555] items-center px-2 my-5">
        <div className="">
          <label htmlFor="amount_field_buy">Amount</label>
        </div>
        <Input
          name="sellAmount"
          type="number"
          id="amount_field_sell"
          value={amount}
          disabled={true}
        />
        <div className="tradeBox__field-sufix">
          <label htmlFor="amount_field_buy">{exchangeTo}</label>
        </div>
      </div>

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

      <button
        type="button"
        disabled={isError}
        onClick={() => trade(PAIR_ORDER_TYPE.SELL)}
        className={`bg-pink-500 w-full block ${isError ? 'opacity-25' : 'opacity-100'}`}
      >
        Sell ${currency}
      </button>
    </div>
  );
};
