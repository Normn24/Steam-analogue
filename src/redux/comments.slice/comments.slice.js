import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addComment = createAsyncThunk(
  "comments/addComment:load",
  async ({ values, token }) => {
    const response = await fetch(`https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/comments`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values)
    });
    if (!response.ok) {
      throw new Error("Failed to add to comments");
    }
    const data = await response.json();
    return data;
  }
);


export const fetchProductComments = createAsyncThunk(
  "comments/fetchProductComments:load",
  async (payload) => {
    const response = await fetch(`https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/comments/product/${payload}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to add to comments");
    }
    const data = await response.json();
    return data;
  }
);

export const removeComment = createAsyncThunk(
  "comments/removeComment:load",
  async ({ id, token }) => {
    const response = await fetch(
      `https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/comments/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove from comments");
    }
    const data = await response.json();
    return data;
  }
);

export const fetchUserComments = createAsyncThunk(
  "comments/fetchUserComments:load",
  async (payload) => {
    const response = await fetch(
      `https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/comments/customer/${payload}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get comments");
    }
    const data = await response.json();
    return data;
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
