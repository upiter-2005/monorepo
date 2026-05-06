import axios from 'axios';

import { API_URL } from '../constants/apiUrls';
import { getToken } from '../helpers/token';

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
