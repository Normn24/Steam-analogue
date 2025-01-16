import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../api/apiClient";

export const fetchGenres = createAsyncThunk(
  'catalog/fetchGenres',
  async () => {
    try {
      const response = await axios.get(`/api/filters`);
      return response.data;
    } catch (error) {
      return error.response?.data;
    }
  }
);

const initialState = {
  genres: [],
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
