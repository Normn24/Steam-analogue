import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch("https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/customers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('token', data.token);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    clearAuthState: (state) => {
      state.status = 'idle';
      state.error = null;
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
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthState } = loginSlice.actions;

export default loginSlice.reducer;
