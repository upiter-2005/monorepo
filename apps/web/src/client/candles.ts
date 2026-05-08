import { binanceApi } from './client';
import { createCandlesUrl } from '../helpers/createCandlesUrl';
import { formatPrice } from '../helpers/formatPrice';

type CandlesPointsType = {
  x: Date;
  y: number[];
};

export const buildChart = async (
  currency: string,
  exchangeTo: string,
  chartInterval: string,
): Promise<CandlesPointsType[]> => {
  const chartUrl = createCandlesUrl((currency + exchangeTo).toUpperCase(), chartInterval);

  const { data } = await binanceApi.get(chartUrl);
  console.log(data);
  const parseData: CandlesPointsType[] = [];

  data.reverse().forEach((el: string, i: number) => {
    const open = formatPrice(el[1], 2);
    const high = formatPrice(el[2], 2);
    const low = formatPrice(el[3], 2);
    const close = formatPrice(el[4], 2);
    parseData.push({
      x: new Date(el[0]),
      y: [Number(open), Number(high), Number(low), Number(close)],
    });
  });

  return parseData;
};
