import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk for sending the reset password email
export const sendResetPasswordEmail = createAsyncThunk(
  'auth/sendResetPasswordEmail',
  async (email, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:4000/api/password/request-reset', { email });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || { message: 'Server error' });
    }
  }
);

// Define the async thunk for resetting the password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, newPassword, navigate }, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/password/reset-password/${token}`, { newPassword });
      navigate('/'); // Use navigate here
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || { message: 'Server error' });
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send Reset Password Email
      .addCase(sendResetPasswordEmail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendResetPasswordEmail.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(sendResetPasswordEmail.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || { message: 'Unknown error' };
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || { message: 'Unknown error' };
      });
  },
});

export const { clearState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
