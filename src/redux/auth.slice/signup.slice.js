import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch("https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
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
