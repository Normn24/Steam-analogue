import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../api/apiClient";

export const updateUserProfile = createAsyncThunk(
  'registration/updateUserProfile',
  async ({ updateProfile }, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/customers",
        updateProfile)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  });

export const updateUserPassword = createAsyncThunk(
  'registration/updateUserPassword',
  async ({ updatePassword }, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/customers/password", 
      updatePassword)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  });

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const response = await axios.get("/api/customers/customer")
    return response.data;
  });

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: [],
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null
        state.message = "User successfully updated";
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.message = null
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.customer) {
          state.error = null
          state.message = action.payload.message;
          state.user = action.payload.customer
        } else {
          state.message = null
          state.error = action.payload;
        }
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});


export default userSlice.reducer;
