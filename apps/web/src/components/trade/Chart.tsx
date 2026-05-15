import { useEffect, useState } from 'react';

import { CandlesPointsType } from '@org/types';
import Chart from 'react-apexcharts';

import { buildChart } from '../../client/candles';
import { INTERVALS } from '../../constants/chartIntervals';
import { CHART_SETTINGS, CHART_TYPE, DEFAULT_CANDLES } from '../../constants/chartSettings';
import { useAppSelector, useAppDispatch } from '../../store/trade/hooks';
import { setChartInterval } from '../../store/trade/slices/activePairSlice';

type CandlesType = {
  name: string;
  data: CandlesPointsType[];
};

export const ChartWidget: React.FC = () => {
  const { currency, exchangeTo, chartInterval } = useAppSelector((state) => state.activePair);
  const dispatch = useAppDispatch();
  const [candles, setCandles] = useState<CandlesType[]>(DEFAULT_CANDLES);

  const makeDataChart = async (): Promise<void> => {
    setCandles(DEFAULT_CANDLES);
    const parseData = await buildChart(currency, exchangeTo, chartInterval);

    setCandles((prev) => [
      {
        name: CHART_TYPE,
        data: parseData,
      },
    ]);
  };

  useEffect(() => {
    makeDataChart();
  }, [chartInterval, currency, exchangeTo]);

  return (
    <>
      <div className="flex gap-1 items-center">
        <div className="font-bold">Timefarame:</div>
        {INTERVALS.map((interval) => (
          <button
            type="button"
            key={interval}
            onClick={() => dispatch(setChartInterval(interval))}
            className={`px-2 py-1 bg-indigo-500 ${interval === chartInterval ? 'opacity-100' : 'opacity-50'}`}
          >
            {interval}
          </button>
        ))}
      </div>
      {candles[0]?.data.length > 0 && (
        <Chart
          key={`${currency}-${exchangeTo}-${chartInterval}-${candles[0]?.data.length}`}
          options={CHART_SETTINGS}
          series={candles}
          height="440px"
          type="candlestick"
        />
      )}
    </>
  );
};
