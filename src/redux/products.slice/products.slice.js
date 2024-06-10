import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  error: null,
  status: null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const data = await fetch("https://pet-project-5-qnedui3gt-normn24s-projects.vercel.app/api/products")
    .then((res) => res.json())
  return data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      });
  },
});


export default productsSlice.reducer;
