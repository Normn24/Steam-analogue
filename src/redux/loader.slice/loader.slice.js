// // features/loader/loaderSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const loaderSlice = createSlice({
//   name: "loader",
//   initialState: false,
//   reducers: {
//     showLoader: () => true,
//     hideLoader: () => false,
//   },
// });

// export const { showLoader, hideLoader } = loaderSlice.actions;
// export default loaderSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: true,
};

const loaderSlice = createSlice({
  name: "global",
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.includes("/pending") && action.type.includes(":load"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.includes("/fulfilled") && action.type.includes(":load"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          action.type.includes("/rejected") && action.type.includes(":load"),
        (state) => {
          state.loading = false;
        }
      );
  },
  reducers: {},
});

export default loaderSlice.reducer;
