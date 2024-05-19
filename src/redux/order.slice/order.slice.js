import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export function getAccessToken() {
  return localStorage.getItem("token");
}

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const response = await fetch(
      "http://localhost:4000/api/orders/",
      {
        method: "GET",
        headers: {
          Authorization: getAccessToken(),
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get orders");
    }
    const data = await response.json();
    return data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    library: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.library = action.payload.map(item => item.products.map(el => el.product))
        state.orders = action.payload;
      });
  },
});

export default orderSlice.reducer;
