import { configureStore } from '@reduxjs/toolkit';

import productItemSlice from './productItem.slice/productItem.slice';
import productsSlice from './products.slice/products.slice';
import slidesSlice from './slides.slice/slides.slice';
import cartsSlice from './carts.slice/carts.slice';
import linksSlice from './links.slice/links.slice';
import catalogsSlice from './catalogs.slice/catalogs.slice';
import genresSlice from './genres.slice/genres.slice';
import catalogProductsSlice from './catalogProducts.slice/catalogProducts.slice';
import wishListSlice from './wishList.slice/wishList.slice';
import commentsSlice from './comments.slice/comments.slice';
import productsByGenreSlice from './productsByGenre/productsByGenre.slice';
import filteredProductsSlice from './filteredProducts.slice/filteredProducts.slice';
import cartSlice from './cart.slice/cart.slice';
import orderSlice from './order.slice/order.slice';
import loginSlice from './auth.slice/login.slice';
import signupSlice from './auth.slice/signup.slice';

export const store = configureStore({
  reducer: {
    product: productItemSlice,
    products: productsSlice,
    slides: slidesSlice,
    carts: cartsSlice,
    links: linksSlice,
    catalogs: catalogsSlice,
    genres: genresSlice,
    categoriesProducts: catalogProductsSlice,
    wishList: wishListSlice,
    comments: commentsSlice,
    productsByGenre: productsByGenreSlice,
    productList: filteredProductsSlice,
    cart: cartSlice,
    orders: orderSlice,
    login: loginSlice,
    signup: signupSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});