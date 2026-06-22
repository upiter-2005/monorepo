import {
  DEFAULT_CLICKED_PRICE,
  DEFAULT_CURRENCY,
  DEFAULT_EXCHANGE,
  DEFAULT_INTERVAL,
} from '@org/constants';
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
  currency: DEFAULT_CURRENCY,
  exchangeTo: DEFAULT_EXCHANGE,
  chartInterval: DEFAULT_INTERVAL,
  clickPrice: DEFAULT_CLICKED_PRICE,
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
