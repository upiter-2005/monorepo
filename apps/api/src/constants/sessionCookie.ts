export const SESSION_COOKIE_CONGIG = {
  httpOnly: true,
  sameSite: 'lax',
  secure: false,
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000,
} as const;

export const DELETE_COOKIE_CONGIG = {
  httpOnly: true,
  sameSite: 'lax',
  secure: false,
  path: '/',
} as const;

export const REFRESH_COOKIE_NAME = 'refreshToken';
