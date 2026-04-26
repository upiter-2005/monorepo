export const SECRET = {
  ACCESS: process.env.JWT_ACCESS_SECRET as string,
  REFRESH: process.env.JWT_REFRESH_SECRET as string,
} as const;

export const EXPIRED = {
  ACCESS: '1m',
  REFRESH: '5m',
} as const;
