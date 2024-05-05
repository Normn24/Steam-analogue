import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCatalog = createAsyncThunk(
  'catalog/fetchCatalog',
  async (categoryName) => {
    try {
      const response = await fetch(`http://localhost:4000/api/products/category=${categoryName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch catalog');
      }
      const { data } = await response.json();
      console.log('fetched catalog', data);
      return data;
    } catch (error) {
      console.error('Error fetching catalog:', error);
      throw error;
    }
  }
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    categories: [],
    // categoryNames: [],
    loading: false,
    error: null
  },
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        
        console.log('fetch catalegories:', state.categories);
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { } = catalogSlice.actions;

export default catalogSlice.reducer;
