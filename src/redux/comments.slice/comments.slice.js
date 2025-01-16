import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/apiClient";

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ values }) => {
    const response = await axios.post(`/api/comments`, values);
    return response.data;
  }
);


export const fetchProductComments = createAsyncThunk(
  "comments/fetchProductComments:load",
  async (payload) => {
    const response = await axios.get(`/api/comments/product/${payload}`);
    return response.data;
  }
);

export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async ({ id }) => {
    const response = await axios.delete(
      `/api/comments/${id}`);
    return response.data;
  }
);

export const fetchUserComments = createAsyncThunk(
  "comments/fetchUserComments",
  async (payload) => {
    const response = await axios.get(
      `/api/comments/customer/${payload}`);
    return response.data;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    userComments: [],
    productComments: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        console.log("Added to comments:", action.payload);
        state.loading = false;
        state.productComments.unshift(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        console.log("Removed from comments:", action.payload);
        state.loading = false;
        state.userComments = state.userComments.filter((product) => {
          return product._id !== action.payload.deletedCommentInfo._id;
        });
      })
      .addCase(fetchUserComments.fulfilled, (state, action) => {
        console.log("Fetched comments:", action.payload);
        state.loading = false;
        state.userComments = action.payload.reverse();
      })
      .addCase(fetchProductComments.fulfilled, (state, action) => {
        console.log("Fetched comments:", action.payload);
        state.loading = false;
        state.productComments = action.payload.reverse();
      });
  },
});


export default commentsSlice.reducer;
