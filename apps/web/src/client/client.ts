import axios from 'axios';

import { API_CANDLES_BINANCE, API_URL } from '../constants/apiUrls';
import { getToken } from '../helpers/token';

export const binanceClient = axios.create({
  baseURL: API_CANDLES_BINANCE,
  withCredentials: false,
});

export const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  const accessToken = getToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
