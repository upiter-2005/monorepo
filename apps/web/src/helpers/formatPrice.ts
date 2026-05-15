export const formatPrice = (price: string, fixedSymbols: number): string => {
  return parseFloat(price).toFixed(fixedSymbols);
};

export const formatPriceNumber = (price: string, fixedSymbols: number): number => {
  return Number(parseFloat(price).toFixed(fixedSymbols));
};

export const multipleFormatPrice = (a: string, b: string): string => {
  return (parseFloat(a) * parseFloat(b)).toString();
};
