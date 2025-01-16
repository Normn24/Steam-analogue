import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "../../api/apiClient";

const initialState = {
  product: [],
  error: null,
  status: null
}

export const fetchProductId = createAsyncThunk('product/fetchProductId:load', async (id) => {
  const response = await axios.get(`/api/products/${id}`,)
  return response.data;
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