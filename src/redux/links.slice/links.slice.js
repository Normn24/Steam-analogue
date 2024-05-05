import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    links: [],
    error: null,
    status: null
}

export const fetchLinks = createAsyncThunk("links/fetchLinks", async () => {
    const data = await fetch("http://localhost:4000/api/links",)
        .then((res) => res.json())
    return data
})

const linkSlice = createSlice({
    name: "links",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLinks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLinks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchLinks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.links = action.payload;
            });
    }
})

export default linkSlice.reducer