import { CandlesPointsType } from '@org/types';

import { binanceApi } from './client';
import { createCandlesUrl } from '../helpers/createCandlesUrl';
import { fillCandles } from '../helpers/fillCandles';

export const buildChart = async (
  currency: string,
  exchangeTo: string,
  chartInterval: string,
): Promise<CandlesPointsType[]> => {
  const chartUrl = createCandlesUrl(currency, exchangeTo, chartInterval);

  const { data } = await binanceApi.get(chartUrl);

  const parseData = fillCandles(data);

  return parseData;
};
