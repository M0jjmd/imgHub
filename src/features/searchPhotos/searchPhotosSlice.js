import { createSlice } from "@reduxjs/toolkit"
import { SearchPhotos } from "./searchPhotosThunk"

export const SearchPhotosSlice = createSlice({
    name: 'searchPhotos',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchPhotos.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(SearchPhotos.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.data = action.payload
            })
            .addCase(SearchPhotos.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error
            })
    }
})

export const searchPhotosData = (state) => state.searchPhotos.data