export const countPickedUsdtAmount = (sliderValue: number, balance: number): number => {
  if (!balance) return 0;

  return balance * (sliderValue / 100);
};
