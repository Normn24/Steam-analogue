import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToWishList = createAsyncThunk(
  "wishList/addToWishList",
  async ({ id, token }) => {

    const response = await fetch(`https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/wishlist/${id}`, {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to add to favorites");
    }
    const data = await response.json();
    return data;
  }
);

export const removeFromWishList = createAsyncThunk(
  "wishList/removeFromWishList",
  async ({ id, token }) => {
    const response = await fetch(
      `https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/wishlist/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove from favorites");
    }

    const data = await response.json();
    return data;
  }
);

export const fetchWishList = createAsyncThunk(
  "wishList/fetchWishList:load",
  async (token) => {
    const response = await fetch(
      "https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/wishlist/",
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get favorites");
    }

    const data = await response.json();
    return data;
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
