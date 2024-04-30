import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './products.slice/products.slice';
import slidesSlice from './slides.slice/slides.slice';

export const store = configureStore({
  reducer: {
    products: productsSlice,
    slides: slidesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});