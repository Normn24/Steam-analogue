import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, token }) => {
    const response = await fetch(`https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/cart/${id}`, {
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

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ id, token }) => {
    const response = await fetch(
      `https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/cart/${id}`,
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

export const fetchCart = createAsyncThunk(
  "cart/fetchCart:load",
  async (token) => {
    const response = await fetch(
      "https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/cart/",
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
