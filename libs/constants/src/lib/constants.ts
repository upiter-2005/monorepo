export const ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export const SORT_BY = {
  CREATED_AT: 'createdAt',
  LAST_LOGIN: 'lastLoginAt',
} as const;

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export const PAIR_ORDER_TYPE = {
  BUY: 'buy',
  SELL: 'sell',
} as const;

export const PAIR_ORDER_STATUS = {
  PENDING: 'pending',
  DONE: 'done',
} as const;

export const TRADE_TYPE = {
  ASK: 'ask',
  BID: 'bid',
} as const;

export const STATUS: Record<string, number> = {
  OK: 200,
  REDIRECT: 302,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const TOKEN_ERRORS = {
  SESSION_NOT_FOUND: 'Session not found, you should login again',
  TOKEN_MISSING: 'Refresh token is missing',
  USER_NOT_FOUND: 'User not found',
  JWT_ACCESS_NOT_DEFIND: 'JWT_ACCESS_SECRET is not defined',
  REFRESH_TOKEN_NOT_FOUND: 'Refresh token not found',
} as const;

export const CURRENCY_LIST = [
  'btc',
  'eth',
  'ton',
  'ltc',
  'not',
  '1inch',
  'neo',
  'dogs',
  'xrp',
  'dot',
  'bnb',
  'qtum',
  'chz',
  'link',
  'rvn',
  'ada',
  'avax',
  'rune',
  'vet',
  'near',
  'sol',
  'usdt',
] as const;

export const PRICE_COLORS = {
  RED: 'text-[#ff6237]',
  GREEN: 'text-[#4d934d]',
} as const;

export const DEFAULT_CURRENCY = 'btc' as const;
export const DEFAULT_EXCHANGE = 'usdt' as const;
export const DEFAULT_INTERVAL = '1h' as const;
export const DEFAULT_CLICKED_PRICE = '0' as const;
