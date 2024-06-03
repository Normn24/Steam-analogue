import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  slides: [],
  error: null,
  status: null
}

export const fetchSlides = createAsyncThunk('slides/fetchSlides:load', async (url) => {
  const data = await fetch(url)
    .then((res) => res.json())
  return data;
});

const slidesSlice = createSlice({
  name: 'slides',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlides.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSlides.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSlides.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.slides = action.payload;
      });
  },
});


export default slidesSlice.reducer;
