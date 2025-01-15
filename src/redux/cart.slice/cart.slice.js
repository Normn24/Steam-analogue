import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/apiClient";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id }) => {
    const response = await axios.put(`/api/cart/${id}`);
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ id}) => {
    const response = await axios.delete(
      `/api/cart/${id}`);
    return response.data;
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart:load",
  async () => {
    const response = await axios.get(
      "/api/cart/");
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload
        console.log(state.cart)
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;
