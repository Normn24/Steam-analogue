import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // const response = await fetch('/products.json');
    const response = await fetch('http://localhost:4000/api/products');
    const { data } = await response.json();
    // console.log('fetched products', data);
    return data;
  }
);

const filterSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filteredProducts: [],
    loading: false,
    error: null
  },
  reducers: {
    applyFilters(state, action) {
      const { searchTerm, searchType } = action.payload;

      if (!searchTerm) {
        state.filteredProducts = []; // Return empty array if searchTerm is empty
        return;
      }

      state.filteredProducts = state.products.filter(product => {
        switch (searchType) {
          case 'Name':
            return product.name.toLowerCase().includes(searchTerm.toLowerCase());
          case 'Categories':
            return product.categories.toLowerCase().includes(searchTerm.toLowerCase());
          case 'Publisher':
            return product.publisher.toLowerCase().includes(searchTerm.toLowerCase());
          case 'Developer':
            return product.developer.toLowerCase().includes(searchTerm.toLowerCase());
          case 'Year':
            return product.yearOfPublication.includes(searchTerm);
          case 'Genres':
            return product.genres.some(genre =>
              genre.toLowerCase().includes(searchTerm.toLowerCase())
            );
          default:
            return true;
        }
      });
      console.log('Filtered products:', state.filteredProducts);
    },
    filterByGenre(state, { payload }) {
      const genre = payload;

      state.filteredProducts = state.products.filter(product =>
        product.genres.some(g => g.toLowerCase().includes(genre.toLowerCase()))
      );

      console.log('Filtered products:', state.filteredProducts);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload; // Initialize filtered products with all products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { applyFilters, filterByGenre } = filterSlice.actions;

export default filterSlice.reducer;
