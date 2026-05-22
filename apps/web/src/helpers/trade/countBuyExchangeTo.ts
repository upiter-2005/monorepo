export const countBuyExchangeTo = (
  exchangeToAmount: number | undefined,
  amount: number,
  clickPrice: string,
): number => {
  if (exchangeToAmount) {
    return Number(exchangeToAmount) - amount * Number(clickPrice);
  }

  return 0;
};
