import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    links: [],
    error: null,
    status: null
}

export const fetchLinks = createAsyncThunk("links/fetchLinks:load", async () => {
    const data = await fetch("https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/links",)
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