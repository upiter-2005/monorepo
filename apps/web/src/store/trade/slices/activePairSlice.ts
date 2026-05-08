import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ActivePairState = {
  currency: string;
  exchangeTo: string;
  chartInterval: string;
  clickPrice: number | null;
};

type SetCurrencyPayload = {
  currency: string;
  exchangeTo: string;
};

const initialState: ActivePairState = {
  currency: '',
  exchangeTo: '',
  chartInterval: '1d',
  clickPrice: null,
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

    setClickPrice: (state, action: PayloadAction<number | null>) => {
      state.clickPrice = action.payload;
    },
  },
});

export const { setCurrency, setChartInterval, setClickPrice } = activePairSlice.actions;

export default activePairSlice.reducer;
