import { useEffect, useState } from 'react';

import { PAIR_ORDER_TYPE } from '@org/constants';
import { OrderType } from '@org/types';

import { countPickedUsdtAmount } from '../helpers/countPickedUsdtAmount';
import { useAppDispatch, useAppSelector } from '../store/trade/hooks';
import { setClickPrice } from '../store/trade/slices/activePairSlice';

type UseUsersProps = {
  amount: number;
  amountForSell: number;
  sliderValueHandler: (value: number) => void;
  changeClickedPrice: (price: string) => void;
};

export function useTrade(balance = 0, tradeType: OrderType): UseUsersProps {
  const [amount, setAmount] = useState<number>(0);
  const [amountForSell, setAmountForSell] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { clickPrice } = useAppSelector((state) => state.activePair);

  const countSellCurrencyAmount = (
    sliderValue: number,
    balance: number,
    clickPrice: string,
  ): number => {
    if (!balance) return 0;

    const pickedUsdtAmount = countPickedUsdtAmount(sliderValue, balance);

    if (tradeType === PAIR_ORDER_TYPE.SELL) {
      setAmountForSell(pickedUsdtAmount);
      return Number((pickedUsdtAmount * Number(clickPrice)).toFixed(5));
    }

    return Number((pickedUsdtAmount / Number(clickPrice)).toFixed(5));
  };

  const sliderValueHandler = (value: number): void => {
    setSliderValue(value);
  };

  const changeClickedPrice = (price: string): void => {
    dispatch(setClickPrice(price));
  };

  useEffect(() => {
    if (balance) {
      const calcCurrency = countSellCurrencyAmount(sliderValue, balance, clickPrice);
      setAmount(calcCurrency);
    }
  }, [sliderValue, balance, clickPrice]);

  return {
    amount,
    amountForSell,
    sliderValueHandler,
    changeClickedPrice,
  };
}
