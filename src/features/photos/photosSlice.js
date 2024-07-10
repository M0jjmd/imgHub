import { createSlice } from "@reduxjs/toolkit"
import { GetPhotos } from "./photosThunk"

export const PhotosSlice = createSlice({
    name: 'photos',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(GetPhotos.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(GetPhotos.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.data = action.payload
        })
        .addCase(GetPhotos.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
    }
})

// export default PhotosSlice.reducer
export const getPhotosData = (state) => state.photos.data