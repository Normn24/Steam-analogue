import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/apiClient";

export const addToWishList = createAsyncThunk(
  "wishList/addToWishList",
  async ({ id }) => {
    const response = await axios.put(`/api/wishlist/${id}`);
    return response.data;
  }
);

export const removeFromWishList = createAsyncThunk(
  "wishList/removeFromWishList",
  async ({ id }) => {
    const response = await axios.delete(
      `/api/wishlist/${id}`);
    return response.data;
  }
);

export const fetchWishList = createAsyncThunk(
  "wishList/fetchWishList:load",
  async () => {
    const response = await axios.get(
      "/api/wishlist/");
    return response.data;
  }
);

const wishListSlice = createSlice({
  name: "wishList",
  initialState: {
    wishList: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishList.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.wishList = action.payload
      })
      .addCase(removeFromWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.wishList = action.payload
      })
      .addCase(fetchWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.wishList = action.payload;
      });
  },
});

export default wishListSlice.reducer;
