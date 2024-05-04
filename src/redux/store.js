import { configureStore } from '@reduxjs/toolkit';
import productItemSlice from './productItem.slice/productItem.slice';
import productsSlice from './products.slice/products.slice';
import slidesSlice from './slides.slice/slides.slice';
import cartsSlice from './carts.slice/carts.slice';

export const store = configureStore({
  reducer: {
    product: productItemSlice,
    products: productsSlice,
    slides: slidesSlice,
    carts: cartsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});