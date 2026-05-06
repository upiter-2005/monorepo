import { MAX_COOKIE_AGE } from './jwtSecrets';

export const SESSION_COOKIE_CONFIG = {
  httpOnly: true,
  sameSite: 'lax',
  secure: false,
  path: '/',
  maxAge: MAX_COOKIE_AGE,
} as const;

export const DELETE_COOKIE_CONGIG = {
  httpOnly: true,
  sameSite: 'lax',
  secure: false,
  path: '/',
} as const;

export const REFRESH_COOKIE_NAME = 'refreshToken';
