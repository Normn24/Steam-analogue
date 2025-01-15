import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../api/apiClient";

export const registerUser = createAsyncThunk(
  'registration/registerUser:load',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/customers",
        JSON.stringify(payload)
      )

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  });

const registrationSlice = createSlice({
  name: 'signup',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {
    clearRegistrationState: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        console.log(action.payload)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearRegistrationState } = registrationSlice.actions;

export default registrationSlice.reducer;
