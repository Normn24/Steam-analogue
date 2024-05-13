import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carts: JSON.parse(localStorage.getItem('carts')) || []
}


const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {addToCart: (state, action) => {
   const cartItem =  state.carts.find((el) => {return el._id === action.payload._id})
   if(!cartItem){
    const addItem = {...action.payload, quantity: 1}
    state.carts.push(addItem)
   }else{
    cartItem.quantity += 1
   }
  },
removeToCart: (state, action) => {
  state.carts = state.carts.filter((el) => el._id !== action.payload)
},
decrementQuantity:(state, action) => {
  const cartItem =  state.carts.find((el) => {return el._id === action.payload})
  if(cartItem && cartItem.quantity > 1){
    cartItem.quantity -= 1
  }
}
},
});



export const {addToCart, removeToCart, decrementQuantity} = cartsSlice.actions

export default cartsSlice.reducer;
