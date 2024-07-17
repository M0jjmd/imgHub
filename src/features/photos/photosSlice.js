import { createSlice } from "@reduxjs/toolkit"
import { GetPhotos } from "./photosThunk"

const photosSlice = createSlice({
    name: "photos",
    initialState: {
        photosData: [],
        status: "idle",
        page: 1,
        error: null,
    },
    reducers: {
        aumentPage: (state) => {
            state.page++
        },
        resetPhotos: (state) => {
            state.photosData = []
            state.page = 1
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetPhotos.pending, (state) => {
                state.status = "loading"
            })
            .addCase(GetPhotos.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.photosData = [...state.photosData, ...action.payload]
            })
            .addCase(GetPhotos.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            });
    },
});

export const { aumentPage, resetPhotos } = photosSlice.actions

export const getPhotosData = (state) => state.photos.photosData
export const getPhotosStatus = (state) => state.photos.status
export const getPhotosPage = (state) => state.photos.page

export default photosSlice.reducer