import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  productList: [],
  error: null,
  status: null
}

export const fetchFilteredProducts = createAsyncThunk('productList/fetchFilteredProducts', async (url) => {
  const data = await fetch(url)
    .then((res) => res.json())
  return data;
});

const filteredProductsSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productList = action.payload;
      });
  },
});


export default filteredProductsSlice.reducer;
