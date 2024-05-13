import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (payload) => {
    const response = await fetch("http://localhost:4000/api/customers/login", {
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

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token: "",
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: () => {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload)
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
