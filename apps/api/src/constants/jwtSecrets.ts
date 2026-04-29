export const EXPIRED = {
  ACCESS: '1m',
  REFRESH: '5m',
} as const;

export const SECRET_KEY = {
  ACCESS: 'JWT_ACCESS_SECRET',
  REFRESH: 'JWT_REFRESH_SECRET',
} as const;

export const MAX_COOKIE_AGE = 7 * 24 * 60 * 60 * 1000;
