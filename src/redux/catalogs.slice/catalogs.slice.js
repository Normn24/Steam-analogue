import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    catalogs: [],
    error: null,
    status: null
}

export const fetchCatalogs = createAsyncThunk("catalogs/fetchCatalogs:load", async () => {
    const data = await fetch("https://pet-project-back-7ppvv6gn4-normn24s-projects.vercel.app/api/catalog",)
        .then((res) => res.json())
    return data
})

const catalogsSlice = createSlice({
    name: "catalogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCatalogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCatalogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchCatalogs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.catalogs = action.payload;
            });
    }
})

export default catalogsSlice.reducer