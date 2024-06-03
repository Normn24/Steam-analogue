import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  productList: [],
  error: null,
  loading: false,
}

export const fetchFilteredProducts = createAsyncThunk('productList/fetchFilteredProducts', async (url) => {
  const data = await fetch(url)
    .then((res) => res.json());
  return data;
});

const filteredProductsSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.productList = action.payload;
        state.loading = false;
      });
  },
});

export default filteredProductsSlice.reducer;
