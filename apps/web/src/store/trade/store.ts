import { configureStore } from '@reduxjs/toolkit';

import activePair from './slices/activePairSlice';

export const store = configureStore({
  reducer: {
    activePair,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
