import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export function getAccessToken() {
  // return localStorage.getItem("accessToken");
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTU3OWE3ZDc2OTcwMmRmMGYwMzJkZiIsImZpcnN0TmFtZSI6InRlc3QiLCJsYXN0TmFtZSI6InRlc3QiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTUwODk1NzEsImV4cCI6MTcxNTEyNTU3MX0.Hz8oCGi7Xt7D4BaUS0ey4xhZiommUPQ27b_wBdtazn0"
}

export const addComment = createAsyncThunk(
  "comments/addComment",
  async (payload) => {
    const response = await fetch(`http://localhost:4000/api/comments/${payload}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ article_id: payload.pk }),
    });
    if (!response.ok) {
      throw new Error("Failed to add to favorites");
    }
    const data = await response.json();
    return data;
  }
);


export const commentsForProduct = createAsyncThunk(
  "comments/commentsForProduct",
  async (payload) => {
    const response = await fetch(`http://localhost:4000/api/comments/product/${payload}`, {
      method: "GET",
      // headers: {
      //   Authorization: `Bearer ${getAccessToken()}`,
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify({ article_id: payload.pk }),
    });
    if (!response.ok) {
      throw new Error("Failed to add to favorites");
    }
    const data = await response.json();
    return data;
  }
);

export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async (payload) => {
    const response = await fetch(
      `http://localhost:4000/api/comments/${payload}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ id: payload.pk }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove from favorites");
    }
    const data = await response.json();
    return data;
  }
);

export const fetchUserComments = createAsyncThunk(
  "comments/fetchUserComments",
  async (payload) => {
    const response = await fetch(
      `http://localhost:4000/api/comments/customer/${payload}`,
      {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${getAccessToken()}`,
        //   "Content-Type": "application/json",
        // },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get favorites");
    }
    const data = await response.json();
    return data;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
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
        state.comments.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        console.log("Removed from comments:", action.payload);
        state.loading = false;
        state.comments.filter((product) => {
          return product.pk !== action.payload.pk;
        });
      })
      .addCase(fetchUserComments.fulfilled, (state, action) => {
        console.log("Fetched comments:", action.payload);
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(commentsForProduct.fulfilled, (state, action) => {
        console.log("Fetched comments:", action.payload);
        state.loading = false;
        state.comments = action.payload;
      });
  },
});


export default commentsSlice.reducer;
