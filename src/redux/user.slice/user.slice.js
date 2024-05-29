import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export function getAccessToken() {
  return localStorage.getItem("token");
}


export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (payload) => {
    const response = await fetch("https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/customers/customer", {
      method: "GET",
      headers: {
        Authorization: getAccessToken(),
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      throw new Error(payload);
    }
    const data = await response.json();

    return data;
  });

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
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
