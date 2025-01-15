import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/apiClient";

export const placeOrder = createAsyncThunk(
  'orders/placeOrder:load',
  async (payload) => {
    const response = await axios.post("/api/orders/",  
      JSON.stringify({
        customerId: payload.userId,
        mobile: payload.phone,
        letterSubject: "Thank you for order! You are welcome!",
        letterHtml: "Your order is placed"
      })
    )
    return response.data.order;
  });

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders:load",
  async () => {
    const response = await axios.get(
      "/api/orders/");
    return response.data;
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
        state.orders = action.payload.reverse();
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
  },
});

export default orderSlice.reducer;
