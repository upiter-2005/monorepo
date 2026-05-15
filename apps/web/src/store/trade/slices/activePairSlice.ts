import { Currencies } from '@org/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ActivePairState = {
  currency: Currencies;
  exchangeTo: Currencies;
  chartInterval: string;
  clickPrice: string;
};

type SetCurrencyPayload = {
  currency: Currencies;
  exchangeTo: Currencies;
};

const initialState: ActivePairState = {
  currency: 'btc',
  exchangeTo: 'usdt',
  chartInterval: '1h',
  clickPrice: '0',
};

export const activePairSlice = createSlice({
  name: 'activePair',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<SetCurrencyPayload>) => {
      state.currency = action.payload.currency;
      state.exchangeTo = action.payload.exchangeTo;
    },

    setChartInterval: (state, action: PayloadAction<string>) => {
      state.chartInterval = action.payload;
    },

    setClickPrice: (state, action: PayloadAction<string>) => {
      state.clickPrice = action.payload;
    },
  },
});

export const { setCurrency, setChartInterval, setClickPrice } = activePairSlice.actions;

export default activePairSlice.reducer;
