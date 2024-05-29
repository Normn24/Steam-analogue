import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCatalogProducts = createAsyncThunk(
  'catalog/fetchCatalogProducts',
  async (categoryName) => {
    try {
      const response = await fetch(`https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/products/category=${categoryName}`,);
      if (!response.ok) {
        throw new Error('Failed to fetch catalog');
      }
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching catalog:', error);
      throw error;
    }
  }
);

const catalogSlice = createSlice({
  name: 'categories',
  initialState: {
    categoriesProducts: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCatalogProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesProducts = action.payload;
      })
      .addCase(fetchCatalogProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default catalogSlice.reducer;