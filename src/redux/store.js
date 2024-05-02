import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './products.slice/products.slice';
import linksSlice from './links.slice/links.slice';
import catalogsSlice from './catalogs.slice/catalogs.slice';

export const store = configureStore({
  reducer: {
    products: productsSlice,
    links: linksSlice,
    catalogs: catalogsSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});