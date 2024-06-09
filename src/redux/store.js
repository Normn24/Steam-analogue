import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartSlice from './cart.slice/cart.slice';
import catalogsSlice from './catalogs.slice/catalogs.slice';
import catalogProductsSlice from './catalogProducts.slice/catalogProducts.slice';
import commentsSlice from './comments.slice/comments.slice';
import delayLoader from './loader.slice/delayLoader';
import downloadedSlice from './downloaded.slice/downloaded.slice';
import filteredProductsSlice from './filteredProducts.slice/filteredProducts.slice';
import genresSlice from './genres.slice/genres.slice';
import loginSlice from './auth.slice/login.slice';
import loaderSlice from './loader.slice/loader.slice';
import orderSlice from './order.slice/order.slice';
import productItemSlice from './productItem.slice/productItem.slice';
import productsSlice from './products.slice/products.slice';
import signupSlice from './auth.slice/signup.slice';
import slidesSlice from './slides.slice/slides.slice';
import userSlice from './user.slice/user.slice';


import wishListSlice from './wishList.slice/wishList.slice';

import forgotPasswordSlice from './auth.slice/forgotPassword.slice';


const authPersistConfig = {
  key: 'login',
  storage: storage,
}

const downloadedPersistConfig = {
  key: 'downloaded',
  storage: storage,
};

const persistedLoginReducer = persistReducer(authPersistConfig, loginSlice);
const persistedDownloadedReducer = persistReducer(downloadedPersistConfig, downloadedSlice);


export const store = configureStore({
  reducer: {
    cart: cartSlice,
    catalogs: catalogsSlice,
    categoriesProducts: catalogProductsSlice,
    comments: commentsSlice,
    downloaded: persistedDownloadedReducer,
    genres: genresSlice,
    login: persistedLoginReducer,
    productList: filteredProductsSlice,
    loader: loaderSlice,
    orders: orderSlice,
    products: productsSlice,
    product: productItemSlice,
    signup: signupSlice,

    slides: slidesSlice,
    user: userSlice,
    wishList: wishListSlice,
    forgotPassword: forgotPasswordSlice

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(delayLoader),
});

export const persistor = persistStore(store);