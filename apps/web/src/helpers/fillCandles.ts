import { CandlesPointsType } from '@org/types';

import { formatCandlePrices } from '../hooks/formatCandlePrices';

export const fillCandles = (candlesArray: []): CandlesPointsType[] => {
  const parseCandles: CandlesPointsType[] = [];

  candlesArray.reverse().forEach((candle: string[], i: number) => {
    const candleData = formatCandlePrices(candle);
    parseCandles.push(candleData);
  });
  return parseCandles;
};
