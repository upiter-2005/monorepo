import {
  BalanceItem,
  Currencies,
  OrderItemType,
  OrderPayload,
  OrderStatus,
  OrderType,
} from '@org/types';
import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithTokenSync } from '../../client/baseQueryWithTokenSync';
import { ROUTES } from '../../constants/routes';

export type BuyCryptoPayload = {
  pair: string;
  price: number;
  amount: number;
  type: OrderType;
  status: OrderStatus;
};

export type BuyCryptoResponse = {
  success: boolean;
  balances: BalanceItem[];
};

export type BalancePayload = {
  currency: Currencies;
  amount: number;
};

export const tradeApi = createApi({
  reducerPath: 'tradeApi',

  baseQuery: baseQueryWithTokenSync,

  tagTypes: ['Balance', 'Orders'],

  endpoints: (builder) => ({
    getBalance: builder.query<BalanceItem, Currencies>({
      query: (currency) => ({
        url: ROUTES.BALANCE,
        method: 'GET',
        params: {
          currency,
        },
      }),
      providesTags: ['Balance'],
    }),

    updateBalance: builder.mutation<BalanceItem, BalancePayload>({
      query: (body) => ({
        url: ROUTES.BALANCE,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Balance'],
    }),

    getOrders: builder.query<OrderItemType[], void>({
      query: () => ({
        url: ROUTES.ORDERS,
        method: 'GET',
      }),
      providesTags: ['Orders'],
    }),

    makeOrder: builder.mutation<BuyCryptoResponse, OrderPayload>({
      query: (body) => ({
        url: ROUTES.ORDERS,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Balance', 'Orders'],
    }),
  }),
});

export const {
  useGetBalanceQuery,
  useUpdateBalanceMutation,
  useMakeOrderMutation,
  useGetOrdersQuery,
} = tradeApi;
