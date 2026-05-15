export const EXPIRED = {
  ACCESS: '1m',
  REFRESH: '2m',
} as const;

export const SECRET_KEY = {
  ACCESS: 'JWT_ACCESS_SECRET',
  REFRESH: 'JWT_REFRESH_SECRET',
} as const;

export const MAX_COOKIE_AGE = 2 * 60 * 1000; // 2 min
