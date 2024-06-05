import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  slides: [],
  error: null,
  status: null
}

export const fetchSlides = createAsyncThunk('slides/fetchSlides:load', async () => {
  const data = await fetch("https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/slides")
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
