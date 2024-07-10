import { configureStore } from "@reduxjs/toolkit";
import { PhotosSlice } from "../features/photos/photosSlice";

export const store = configureStore({
    reducer: {
        photos: PhotosSlice.reducer
    }
})