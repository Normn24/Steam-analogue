import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGenres = createAsyncThunk(
  'catalog/fetchGenres',
  async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/filters`);
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
      const { data } = await response.json();
      console.log('fetched genres', data);
      return data;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  }
);

const genresSlice = createSlice({
  name: 'genres',
  initialState: {
    genres: [],
    // categoryNames: [],
    loading: false,
    error: null
  },
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.genres = action.payload;
        
        console.log('fetch genres:', state.genres);
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { } = genresSlice.actions;

export default genresSlice.reducer;
