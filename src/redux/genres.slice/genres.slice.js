import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGenres = createAsyncThunk(
  'catalog/fetchGenres',
  async () => {
    try {
      const response = await fetch(`https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/filters`);
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
      const data = await response.json();
      // console.log('fetched genres', data);
      return data;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  }
);

const initialState = {
  genres: [],
  // categoryNames: [],
  loading: false,
  error: null
}

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default genresSlice.reducer;
