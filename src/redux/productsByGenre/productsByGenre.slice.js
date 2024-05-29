import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProductsByGenre = createAsyncThunk(
  'genres/fetchProductsByGenre',
  async (genreId) => {
    try {
      const response = await fetch(`https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/products/genre=${genreId}`,);
      if (!response.ok) {
        throw new Error('Failed to fetch catalog');
      }
      const { data } = await response.json();
      console.log(`productsFilteredByGenre _id=${genreId}`, data);
      return data;
    } catch (error) {
      console.error('Error fetching catalog:', error);
      throw error;
    }
  }
);

const productsByGenre = createSlice({
  name: 'filteredGenres',
  initialState: {
    productsFilteredByGenre: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByGenre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.productsFilteredByGenre = action.payload;
      })
      .addCase(fetchProductsByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});


export default productsByGenre.reducer;