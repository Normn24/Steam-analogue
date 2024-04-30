import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carts: []
}


const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {},
});


export default cartsSlice.reducer;
