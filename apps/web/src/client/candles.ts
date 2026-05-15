import { CandlesPointsType } from '@org/types';

import { binanceApi } from './client';
import { createCandlesUrl } from '../helpers/createCandlesUrl';
import { formatCandlePrices } from '../hooks/formatCandlePrices';

export const buildChart = async (
  currency: string,
  exchangeTo: string,
  chartInterval: string,
): Promise<CandlesPointsType[]> => {
  const chartUrl = createCandlesUrl((currency + exchangeTo).toUpperCase(), chartInterval);
  const { data } = await binanceApi.get(chartUrl);
  const parseData: CandlesPointsType[] = [];

  data.reverse().forEach((candle: string[], i: number) => {
    const candleData = formatCandlePrices(candle);
    parseData.push(candleData);
  });

  return parseData;
};
