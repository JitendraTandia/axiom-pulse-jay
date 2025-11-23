import { configureStore } from '@reduxjs/toolkit';
import marketReducer from '../store/slices/marketSlice';
import uiReducer from '../store/slices/uiSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      market: marketReducer,
      ui: uiReducer,
    },
  });
};

// Singleton store for client usage
export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
