export type BalancePayload = {
  currency: string;
  amount: number;
};

export type BalanceReturn = {
  id: string;
} & BalancePayload;
