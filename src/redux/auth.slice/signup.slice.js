import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async (payload) => {
    const response = await fetch("http://localhost:4000/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    })
    if (!response.ok) {
      throw new Error(payload);
    }
    const data = await response.json();
    localStorage.setItem('loggedIn', true)
    localStorage.setItem('token', data.token)
    return data;
  });

const registrationSlice = createSlice({
  name: 'signup',
  initialState: {
    token: "",
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
        console.log(action.payload)
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearRegistrationState } = registrationSlice.actions;

export default registrationSlice.reducer;
