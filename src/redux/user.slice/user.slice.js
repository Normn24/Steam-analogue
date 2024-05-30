import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export function getAccessToken() {
  return localStorage.getItem("token");
}

export const updateUserProfile = createAsyncThunk(
  'registration/updateUserProfile',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch("https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/customers", {
        method: "PUT",
        headers: {
          Authorization: getAccessToken(),
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

export const updateUserPassword = createAsyncThunk(
  'registration/updateUserPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch("https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/customers/password", {
        method: "PUT",
        headers: {
          Authorization: getAccessToken(),
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
