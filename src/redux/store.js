import { configureStore } from '@reduxjs/toolkit';
import productItemSlice from './productItem.slice/productItem.slice';
import productsSlice from './products.slice/products.slice';
import slidesSlice from './slides.slice/slides.slice';
import linksSlice from './links.slice/links.slice';
import catalogsSlice from './catalogs.slice/catalogs.slice';
import genresSlice from './genres.slice/genres.slice';
import catalogProductsSlice from './catalogProducts.slice/catalogProducts.slice';
import productsByGenreSlice from './productsByGenre/productsByGenre.slice';

export const store = configureStore({
  reducer: {
    product: productItemSlice,
    products: productsSlice,
    slides: slidesSlice,
    links: linksSlice,
    catalogs: catalogsSlice, 
    genres: genresSlice,
    categoriesProducts: catalogProductsSlice,
    productsByGenre: productsByGenreSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});