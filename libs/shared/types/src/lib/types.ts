import {
  ORDER,
  SORT_BY,
  ROLES,
  PAIR_ORDER_TYPE,
  PAIR_ORDER_STATUS,
  TRADE_TYPE,
  CURRENCY_LIST,
  PRICE_COLORS,
} from '@org/constants';

export interface CredentialResponseData {
  email?: string;
  family_name?: string;
  given_name?: string;
  name?: string;
  picture?: string;
}

export type UserRole = typeof ROLES.USER | typeof ROLES.ADMIN;
export type SortBy = typeof SORT_BY.CREATED_AT | typeof SORT_BY.LAST_LOGIN;
export type Order = typeof ORDER.ASC | typeof ORDER.DESC;

export type OrderType = typeof PAIR_ORDER_TYPE.BUY | typeof PAIR_ORDER_TYPE.SELL;
export type OrderStatus = typeof PAIR_ORDER_STATUS.PENDING | typeof PAIR_ORDER_STATUS.DONE;
export type TradeType = typeof TRADE_TYPE.ASK | typeof TRADE_TYPE.BID;

export type CandlesColors = typeof PRICE_COLORS.RED | typeof PRICE_COLORS.GREEN;
export type Pair = [string, string];

export type User = {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string;
  createdAt: string;
  lastLoginAt: string;
};

export type FetchUsersPayload = User;

export type Params = {
  search?: string;
  sortBy?: SortBy;
  order?: Order;
};

export type Pagination = {
  page: number;
  limit: number;
};

export interface LoginPayload {
  email: string;
  name: string;
}

export type LoginResponse = {
  email: string;
  role: UserRole;
  accessToken: string;
};

export type Currencies = (typeof CURRENCY_LIST)[number];

export type BalanceItem = {
  currency: Currencies;
  amount: number;
};

export type OrderPayload = {
  pair: string;
  price: number;
  amount: number;
  type: OrderType;
  status: OrderStatus;
};
export type OrderItemType = {
  id?: string;
  pair: string;
  price: number;
  amount: number;
  type: OrderType;
  status: OrderStatus;
  time: string;
};

export type CandlesPointsType = {
  x: Date;
  y: number[];
};

export type CandlesType = {
  name: string;
  data: CandlesPointsType[];
};
