import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTokenFromLocalStorage, removeTokenFromLocalStorage, setTokenToLocalStorage } from '../../utils/TokenUtils';
import axios from "../../api/apiClient";
import { fetchUser } from '../user.slice/user.slice';
import { fetchWishList } from '../wishList.slice/wishList.slice';
import { fetchCart } from '../cart.slice/cart.slice';
import { fetchOrders } from '../order.slice/order.slice';

const initialState = {
  token: "",
  status: 'loading',
  error: null,
}

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/api/customers/login", 
        JSON.stringify(payload)
      );
      dispatch(setToken(response.data.token));
      dispatch(initializeSession())
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const initializeSession = createAsyncThunk(
  "auth/initializeSession",
  async (_, { dispatch  }) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      dispatch(setToken(token));
      dispatch(fetchUser());
      dispatch(fetchWishList());
      dispatch(fetchCart());
      dispatch(fetchOrders());
    }
  }
);


const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
      setTokenToLocalStorage(payload);
    },
    clearAuthState: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    clearToken: (state) => {
      removeTokenFromLocalStorage();
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearAuthState, setToken, clearToken } = loginSlice.actions;

export default loginSlice.reducer;
