import type { Response } from 'express';
import { REFRESH_COOKIE_NAME, SESSION_COOKIE_CONFIG } from '../constants/sessionCookie';

export const setRefreshCookie = (res: Response, refreshToken: string): void => {
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, SESSION_COOKIE_CONFIG);
};
