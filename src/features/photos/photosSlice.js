import { createSlice } from "@reduxjs/toolkit"
import { GetPhotos } from "./photosThunk"

export const PhotosSlice = createSlice({
    name: 'photos',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
        loaded: false  // Nuevo estado para indicar si los datos ya están cargados
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetPhotos.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(GetPhotos.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.data = action.payload
                state.loaded = true  // Indicamos que los datos se han cargado correctamente
            })
            .addCase(GetPhotos.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error
            })
    }
})

export const getPhotosData = (state) => state.photos.data
export const getPhotosStatus = (state) => state.photos.status
export const getPhotosLoaded = (state) => state.photos.loaded

export default PhotosSlice.reducer

// import { createSlice } from "@reduxjs/toolkit"
// import { GetPhotos } from "./photosThunk"

// export const PhotosSlice = createSlice({
//     name: 'photos',
//     initialState: {
//         data: [],
//         status: 'idle',
//         error: null
//     },
//     extraReducers: (builder) => {
//         builder.addCase(GetPhotos.pending, (state, action) => {
//             state.status = 'pending'
//         })
//         .addCase(GetPhotos.fulfilled, (state, action) => {
//             state.status = 'fulfilled'
//             state.data = action.payload
//         })
//         .addCase(GetPhotos.rejected, (state, action) => {
//             state.status = 'rejected'
//             state.error = action.error
//         })
//     }
// })

// // export default PhotosSlice.reducer
// export const getPhotosData = (state) => state.photos.data