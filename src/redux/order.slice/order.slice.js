import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export function getAccessToken() {
  return localStorage.getItem("token");
}


export const placeOrder = createAsyncThunk(
  'orders/placeOrder:load',
  async (payload) => {
    const response = await fetch("https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: payload.userId,
        mobile: payload.phone,
        letterSubject: "Thank you for order! You are welcome!",
        letterHtml: "Your order is placed"
      })
    })
    console.log(payload)

    if (!response.ok) {
      throw new Error(payload);
    }
    const data = await response.json();
    console.log(data.order)
    return data.order;
  });

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders:load",
  async () => {
    const response = await fetch(
      "https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/orders/",
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
        state.orders = action.payload.reverse();
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
  },
});

export default orderSlice.reducer;
