import { CandlesPointsType, CandlesType } from '@org/types';

import { CHART_TYPE } from '../constants/chartSettings';

export const createCandles = (candlesData: CandlesPointsType[]): CandlesType[] => {
  return [
    {
      name: CHART_TYPE,
      data: candlesData,
    },
  ];
};
