import { useEffect, useState } from 'react';

import Chart from 'react-apexcharts';

import { buildChart } from '../../client/candles';
import { INTERVALS } from '../../constants/chartIntervals';
import { chartSettings } from '../../constants/chartSettings';
import { useAppSelector, useAppDispatch } from '../../store/trade/hooks';
import { setChartInterval } from '../../store/trade/slices/activePairSlice';

type CandlesPointsType = {
  x: Date;
  y: number[];
};
type CandlesType = {
  name: string;
  data: CandlesPointsType[];
};

export const ChartWidget: React.FC = () => {
  const { currency, exchangeTo, chartInterval } = useAppSelector((state) => state.activePair);
  const dispatch = useAppDispatch();
  const [candles, setCandles] = useState<CandlesType[]>([
    {
      name: 'candle',
      data: [],
    },
  ]);

  const makeDataChart = async (): Promise<void> => {
    const parseData = await buildChart(currency, exchangeTo, chartInterval);
    console.log(parseData);
    setCandles((prev) => [
      {
        ...prev[0],
        data: parseData,
      },
    ]);
  };

  useEffect(() => {
    makeDataChart();
  }, [chartInterval, currency, exchangeTo]);

  return (
    <>
      <div>
        <span>Time:</span>
        {INTERVALS.map((interval) => (
          <button type="button" key={interval} onClick={() => dispatch(setChartInterval(interval))}>
            {interval}
          </button>
        ))}
      </div>
      {candles && (
        <Chart
          key={`${currency}-${exchangeTo}-${chartInterval}`}
          options={chartSettings}
          series={candles}
          height="440px"
          type="candlestick"
        />
      )}
    </>
  );
};
