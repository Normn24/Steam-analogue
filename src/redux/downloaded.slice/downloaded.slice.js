import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  downloaded: []
};

const downloadedSlice = createSlice({
  name: 'downloaded',
  initialState,
  reducers: {
    addDownloaded: (state, action) => {
      state.downloaded.push(action.payload);
    },
    removeDownloaded: (state, action) => {
      state.downloaded = state.downloaded.filter(id => id !== action.payload);
    },
  }
});

export const { addDownloaded, removeDownloaded } = downloadedSlice.actions;
export default downloadedSlice.reducer;
