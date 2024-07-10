import { configureStore } from "@reduxjs/toolkit";
import { PhotosSlice } from "../features/photos/photosSlice";
import { SearchPhotosSlice } from "../features/searchPhotos/searchPhotosSlice";

export const store = configureStore({
    reducer: {
        photos: PhotosSlice.reducer,
        searchPhotos: SearchPhotosSlice.reducer

    }
})