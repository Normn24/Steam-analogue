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
    clearDownloaded: (state) => {
      state.downloaded = [];
    },
  }
});

export const { addDownloaded, removeDownloaded, clearDownloaded } = downloadedSlice.actions;
export default downloadedSlice.reducer;
