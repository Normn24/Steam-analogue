import { configureStore } from '@reduxjs/toolkit';
import productItemSlice from './productItem.slice/productItem.slice';
import productsSlice from './products.slice/products.slice';
import slidesSlice from './slides.slice/slides.slice';
import linksSlice from './links.slice/links.slice';
import catalogsSlice from './catalogs.slice/catalogs.slice';
import catalogProductsSlice from './catalogProducts.slice/catalogProducts.slice';
import wishListSlice from './wishList.slice/wishList.slice';
import commentsSlice from './comments.slice/comments.slice';

export const store = configureStore({
  reducer: {
    product: productItemSlice,
    products: productsSlice,
    slides: slidesSlice,
    links: linksSlice,
    catalogs: catalogsSlice,
    categoriesProducts: catalogProductsSlice,
    wishList: wishListSlice,
    comments: commentsSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});