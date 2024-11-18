import { createSlice } from "@reduxjs/toolkit"
import { GetPhotos } from "./photosThunk"

const searchPhotosSlice = createSlice({
    name: 'searchPhotos',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
        page: 1
    },
    reducers: {
        incrementSearchPage: (state) => {
            state.page++
        },
        clearSearchPhotos: (state) => {
            state.data = []
            state.status = 'idle'
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetPhotos.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(GetPhotos.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = [...state.data, ...action.payload]
            })
            .addCase(GetPhotos.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Failed to fetch photos.'
            })
    },
})

export const { clearSearchPhotos, incrementSearchPage } = searchPhotosSlice.actions

export const searchPhotosData = (state) => state.searchPhotos.data
export const getSearchPhotosStatus = (state) => state.searchPhotos.status
export const getSearchPhotosPage = (state) => state.searchPhotos.page

export default searchPhotosSlice.reducer