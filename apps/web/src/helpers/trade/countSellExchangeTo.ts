export const countSellExchangeTo = (amount: number, exchangeAmount: number | undefined): number => {
  if (amount && exchangeAmount) {
    return amount + Number(exchangeAmount);
  }

  return 0;
};
