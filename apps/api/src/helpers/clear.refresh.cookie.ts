import type { Response } from 'express';
import { DELETE_COOKIE_CONGIG, REFRESH_COOKIE_NAME } from '../constants/sessionCookie';

export const clearRefreshCookie = (res: Response): void => {
  res.clearCookie(REFRESH_COOKIE_NAME, DELETE_COOKIE_CONGIG);
};
