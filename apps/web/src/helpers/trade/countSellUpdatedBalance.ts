export const countSellUpdatedBalance = (
  currencyAmount: number | undefined,
  amount: number | null,
): number => {
  if (currencyAmount && amount) {
    return Number(currencyAmount) - Number(amount);
  }

  return 0;
};
