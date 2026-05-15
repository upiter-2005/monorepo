import { CandlesPointsType } from '@org/types';

import { formatPriceNumber } from '../helpers/formatPrice';

export const formatCandlePrices = (candle: string[]): CandlesPointsType => {
  const open = formatPriceNumber(candle[1], 2);
  const high = formatPriceNumber(candle[2], 2);
  const low = formatPriceNumber(candle[3], 2);
  const close = formatPriceNumber(candle[4], 2);

  return {
    x: new Date(candle[0]),
    y: [open, high, low, close],
  };
};
