import type { Response, Request } from 'express';
import {
  DELETE_COOKIE_CONGIG,
  REFRESH_COOKIE_NAME,
  SESSION_COOKIE_CONFIG,
} from '../constants/sessionCookie';

export const setRefreshCookie = (res: Response, refreshToken: string): void => {
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, SESSION_COOKIE_CONFIG);
};

export const clearRefreshCookie = (res: Response): void => {
  res.clearCookie(REFRESH_COOKIE_NAME, DELETE_COOKIE_CONGIG);
};

export const getRefreshCookie = (request: Request): string | undefined => {
  return request.cookies.refreshToken;
};
