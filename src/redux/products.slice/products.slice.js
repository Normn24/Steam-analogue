import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "../../api/apiClient";

const initialState = {
  products: [],
  error: null,
  status: null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get("/api/products")
  return response.data;
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
