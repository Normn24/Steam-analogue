import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: {},
  error: null,
  status: null
}

export const fetchProductId = createAsyncThunk('products/fetchProducts', async (id) => {
  const data = await fetch(`http://localhost:4000/api/products/${id}`,)
    .then((res) => res.json())
  return data;
});

const productItemSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      });
  },
});


export default productItemSlice.reducer;