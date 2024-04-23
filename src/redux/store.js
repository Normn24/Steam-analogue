import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './products.slice/products.slice';

export const store = configureStore({
  reducer: {
    products: productsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});