import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carts: JSON.parse(localStorage.getItem('carts')) || []
}


const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {addToCart: (state, action) => {
    state.carts.push(action.payload)
  },
removeToCart: (state, action) => {
  state.carts = state.carts.filter((cartId) => cartId !== action.payload)
},
},
});



export const {addToCart, removeToCart} = cartsSlice.actions

export default cartsSlice.reducer;
