import { PAIR_ORDER_TYPE } from '@org/constants';
import { OrderType } from '@org/types';

import { createOrderPayload } from '../helpers/createOrderPayload';
import { countBuyExchangeTo } from '../helpers/trade/countBuyExchangeTo';
import { countBuyUpdatedCurrency } from '../helpers/trade/countBuyUpdatedCurrency';
import { countSellExchangeTo } from '../helpers/trade/countSellExchangeTo';
import { countSellUpdatedBalance } from '../helpers/trade/countSellUpdatedBalance';
import { useAppSelector } from '../store/trade/hooks';
import {
  useGetBalanceQuery,
  useMakeOrderMutation,
  useUpdateBalanceMutation,
} from '../store/trade/tradeApi';

type UseBalanceProps = {
  onTrade: (type: OrderType) => void;
};

export function useBalanceHandler(amount: number, amountForSell: number | null): UseBalanceProps {
  const { currency, exchangeTo, clickPrice } = useAppSelector((state) => state.activePair);

  const { data: currencyAmount } = useGetBalanceQuery(currency);
  const { data: exchangeToAmount } = useGetBalanceQuery(exchangeTo);

  const [makeOrder] = useMakeOrderMutation();
  const [updateBalance] = useUpdateBalanceMutation();

  const onBuyUpdateBalance = async (): Promise<void> => {
    const exchangeToBalance = countBuyExchangeTo(exchangeToAmount?.amount, amount, clickPrice);

    await updateBalance({
      currency: exchangeTo,
      amount: exchangeToBalance,
    });

    const updatedCurrencyBalance = countBuyUpdatedCurrency(currencyAmount?.amount, amount);

    await updateBalance({
      currency: currency,
      amount: updatedCurrencyBalance,
    });
  };

  const onSellUpdateBalance = async (): Promise<void> => {
    const updatedCurrencyBalance = countSellUpdatedBalance(currencyAmount?.amount, amountForSell);

    await updateBalance({
      currency,
      amount: updatedCurrencyBalance,
    });

    const exchangeToBalance = countSellExchangeTo(amount, exchangeToAmount?.amount);

    await updateBalance({
      currency: exchangeTo,
      amount: exchangeToBalance,
    });
  };

  const onTrade = async (type: OrderType): Promise<void> => {
    try {
      if (Number(amount) === 0) throw new Error('Choose currency amount');

      const payload = createOrderPayload(currency, exchangeTo, clickPrice, Number(amount), type);
      await makeOrder(payload).unwrap();

      if (type === PAIR_ORDER_TYPE.BUY) {
        onBuyUpdateBalance();
      } else {
        onSellUpdateBalance();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
        return;
      }

      console.log('Unknown error:', err);
    }
  };

  return {
    onTrade,
  };
}
