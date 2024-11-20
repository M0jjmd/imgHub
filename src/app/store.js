import { configureStore } from "@reduxjs/toolkit"
import photosReducer from "../features/photos/photosSlice"
import searchPhotosReducer from "../features/photos/searchPhotosSlice"

const store = configureStore({
    reducer: {
        photos: photosReducer,
        searchPhotos: searchPhotosReducer,
    },
})

export default store