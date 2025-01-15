import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../api/apiClient";


export const fetchCatalogProducts = createAsyncThunk(
  'catalog/fetchCatalogProducts:load',
  async (categoryName) => {
    try {
      const response = await axios.get(`/api/products/category=${categoryName}`,);
      const { data } = await response.data;
      return data;
    } catch (error) {
      return error.response?.data;

    }
  }
);

const catalogSlice = createSlice({
  name: 'categories',
  initialState: {
    categoriesProducts: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCatalogProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesProducts = action.payload;
      })
      .addCase(fetchCatalogProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default catalogSlice.reducer;