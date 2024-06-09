import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  token: "",
  loggedIn: false,
  status: 'idle',
  error: null,
}

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch("https://pet-project-5-qnedui3gt-normn24s-projects.vercel.app/api/customers/login", {
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
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.loggedIn = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.token = action.payload.token;
        state.loggedIn = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.loggedIn = false
        state.error = action.payload;
      });
  },
});

export const { clearAuthState } = loginSlice.actions;

export default loginSlice.reducer;
