import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export function getAccessToken() {
  // return localStorage.getItem("accessToken");
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTU3OWE3ZDc2OTcwMmRmMGYwMzJkZiIsImZpcnN0TmFtZSI6InRlc3QiLCJsYXN0TmFtZSI6InRlc3QiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTUzNDg2NDQsImV4cCI6MTcxNTM4NDY0NH0.bkt7DlDNGm_ubQCeb56lbkT4BOhurThc1RCCdYW4i_E"
}

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (payload) => {
    const response = await fetch(`http://localhost:4000/api/cart/${payload}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
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
  async (payload) => {
    const response = await fetch(
      `http://localhost:4000/api/cart/${payload}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
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
  "cart/fetchCart",
  async () => {
    const response = await fetch(
      "http://localhost:4000/api/cart/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
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
        state.cart?.products.push(action.payload);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.products.filter((item) => {
          item._id !== action.payload._id;
        });
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;
