import { CANDLES_LIMIT } from '../constants/candles';

export const createCandlesUrl = (
  currency: string,
  exchangeTo: string,
  interval: string,
): string => {
  const pair = (currency + exchangeTo).toUpperCase();
  return `/klines?symbol=${pair}&interval=${interval}&limit=${CANDLES_LIMIT}`;
};
