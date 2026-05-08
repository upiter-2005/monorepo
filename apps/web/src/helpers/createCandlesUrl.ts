export const createCandlesUrl = (pair: string, interval: string): string =>
  `/klines?symbol=${pair}&interval=${interval}&limit=100`;
