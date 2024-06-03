import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer, persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productItemSlice from './productItem.slice/productItem.slice';
import productsSlice from './products.slice/products.slice';
import slidesSlice from './slides.slice/slides.slice';
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
import downloadedSlice from './downloaded.slice/downloaded.slice';
import userSlice from './user.slice/user.slice';
import loaderSlice from './loader.slice/loader.slice';
import delayLoader from './loader.slice/delayLoader';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, downloadedSlice);

export const store = configureStore({
  reducer: {
    product: productItemSlice,
    products: productsSlice,
    slides: slidesSlice,
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
    downloaded: persistedReducer,
    user: userSlice,
    loader: loaderSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(delayLoader),
});

export const persistor = persistStore(store);