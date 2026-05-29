import { WS_URL } from '../constants/WsUrls';

export const createWsUrl = (currency: string, exchangeTo: string, params: string): string => {
  return `${WS_URL}/${currency + exchangeTo}${params}`;
};
