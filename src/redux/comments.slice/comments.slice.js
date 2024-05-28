import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export function getAccessToken() {
  return localStorage.getItem("token");
}

export const addComment = createAsyncThunk(
  "comments/addComment",
  async (payload) => {
    const response = await fetch(`http://localhost:4000/api/comments`, {
      method: "POST",
      headers: {
        Authorization: getAccessToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error("Failed to add to comments");
    }
    const data = await response.json();
    return data;
  }
);


export const fetchProductComments = createAsyncThunk(
  "comments/fetchProductComments",
  async (payload) => {
    const response = await fetch(`http://localhost:4000/api/comments/product/${payload}`, {
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
  "comments/removeComment",
  async (payload) => {
    const response = await fetch(
      `http://localhost:4000/api/comments/${payload}`,
      {
        method: "DELETE",
        headers: {
          Authorization: getAccessToken(),
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
  "comments/fetchUserComments",
  async (payload) => {
    const response = await fetch(
      `http://localhost:4000/api/comments/customer/${payload}`,
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
        state.productComments.push(action.payload);
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
        state.userComments = action.payload;
      })
      .addCase(fetchProductComments.fulfilled, (state, action) => {
        console.log("Fetched comments:", action.payload);
        state.loading = false;
        state.productComments = action.payload;
      });
  },
});


export default commentsSlice.reducer;
