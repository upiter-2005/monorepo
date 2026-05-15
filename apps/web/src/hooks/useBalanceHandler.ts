import { PAIR_ORDER_TYPE } from '@org/constants';
import { OrderType } from '@org/types';

import { createOrderPayload } from '../helpers/createOrderPayload';
import { useAppSelector } from '../store/trade/hooks';
import {
  useGetBalanceQuery,
  useMakeOrderMutation,
  useUpdateBalanceMutation,
} from '../store/trade/tradeApi';

type UseBalanceProps = {
  trade: (type: OrderType) => void;
};

export function useBalanceHandler(amount: string, amountForSell: number | null): UseBalanceProps {
  const { currency, exchangeTo, clickPrice } = useAppSelector((state) => state.activePair);

  const { data: currencyAmount } = useGetBalanceQuery(currency);
  const { data: exchangeToAmount } = useGetBalanceQuery(exchangeTo);

  const [makeOrder] = useMakeOrderMutation();
  const [updateBalance] = useUpdateBalanceMutation();

  const buyUpdateBalance = async (): Promise<void> => {
    const exchangeToBalance =
      Number(exchangeToAmount?.amount) - Number(amount) * Number(clickPrice);

    await updateBalance({
      currency: exchangeTo,
      amount: exchangeToBalance,
    });

    const updatedCurrencyBalance = Number(currencyAmount?.amount) + Number(amount);

    await updateBalance({
      currency: currency,
      amount: updatedCurrencyBalance,
    });
  };

  const sellUpdateBalance = async (): Promise<void> => {
    const updatedCurrencyBalance = Number(currencyAmount?.amount) - Number(amountForSell);

    await updateBalance({
      currency,
      amount: updatedCurrencyBalance,
    });

    const exchangeToBalance = Number(amount) + Number(exchangeToAmount?.amount);

    await updateBalance({
      currency: exchangeTo,
      amount: exchangeToBalance,
    });
  };

  const trade = async (type: OrderType): Promise<void> => {
    try {
      if (Number(amount) === 0) throw new Error('Choose currency amount');

      const payload = createOrderPayload(currency, exchangeTo, clickPrice, Number(amount), type);
      await makeOrder(payload).unwrap();

      if (type === PAIR_ORDER_TYPE.BUY) {
        buyUpdateBalance();
      } else {
        sellUpdateBalance();
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
    trade,
  };
}
