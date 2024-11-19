import { createSlice } from "@reduxjs/toolkit"
import { GetPhotos } from "./photosThunk"

const searchPhotosSlice = createSlice({
    name: "searchPhotos",
    initialState: {
        data: [],
        status: "idle",
        page: 1,
        error: null
    },
    reducers: {
        incrementSearchPage: (state) => {
            state.page++
        },
        clearSearchPhotos: (state) => {
            state.data = []
            state.page = 1
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetPhotos.pending, (state) => {
                state.status = "loading"
            })
            .addCase(GetPhotos.fulfilled, (state, action) => {
                state.status = "fulfilled"
                const uniquePhotos = action.payload.filter(
                    (photo, index, self) =>
                        self.findIndex((p) => p.id === photo.id) === index && photo.id != null
                )
                state.data = [...state.data, ...uniquePhotos]
            })
            .addCase(GetPhotos.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || "Failed to fetch photos."
            })
    },
})

export const { clearSearchPhotos, incrementSearchPage } = searchPhotosSlice.actions

export const searchPhotosData = (state) => state.searchPhotos.data
export const getSearchPhotosStatus = (state) => state.searchPhotos.status
export const getSearchPhotosPage = (state) => state.searchPhotos.page

export default searchPhotosSlice.reducer