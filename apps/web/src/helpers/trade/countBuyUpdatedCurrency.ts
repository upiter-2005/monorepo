export const countBuyUpdatedCurrency = (
  currencyAmount: number | undefined,
  amount: number,
): number => {
  if (currencyAmount) {
    return Number(currencyAmount) + amount;
  }

  return 0;
};
