import { configureStore } from '@reduxjs/toolkit';
import productItemSlice from './productItem.slice/productItem.slice';

export const store = configureStore({
  reducer: {
    product: productItemSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});