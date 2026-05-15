import Slider from '@mui/material/Slider';
import { PAIR_ORDER_TYPE } from '@org/constants';

import { MARKS } from '../../constants/marks';
import { useBalanceHandler } from '../../hooks/useBalanceHandler';
import { useTrade } from '../../hooks/useTrade';
import { Input } from '../../share/ui/Input';
import { useAppSelector } from '../../store/trade/hooks';
import { useGetBalanceQuery } from '../../store/trade/tradeApi';
import { UserUsdtBalance } from '../users/UserUsdtBalance';

export const Buy: React.FC = () => {
  const { currency, exchangeTo, clickPrice } = useAppSelector((state) => state.activePair);
  const { data: exchangeToAmount, isError } = useGetBalanceQuery(exchangeTo);

  const { amount, sliderValueHandler, changeClickedPrice } = useTrade(
    exchangeToAmount?.amount,
    PAIR_ORDER_TYPE.BUY,
  );
  const { trade } = useBalanceHandler(amount, null);

  return (
    <div className="w-full bg-[#181A20] p-3 rounded-lg">
      <div className="flex justify-between">
        <span>Avlb</span>
        <div className="flex gap-2">
          my balance <UserUsdtBalance />
        </div>
      </div>
      <div className="flex gap-3 w-full bg-[#555] items-center px-2">
        <div>Price</div>

        <Input
          name="priceBuy"
          type="number"
          id="price_field_buy"
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
          name="currencyAmount"
          type="number"
          id="amount_field_buy"
          value={amount}
          disabled={true}
        />
        <div className="tradeBox__field-sufix">
          <label htmlFor="amount_field_buy">{currency}</label>
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
        onClick={() => trade(PAIR_ORDER_TYPE.BUY)}
        className={`bg-indigo-500 w-full block ${isError ? 'opacity-25' : 'opacity-100'}`}
      >
        Buy ${currency}
      </button>
    </div>
  );
};
