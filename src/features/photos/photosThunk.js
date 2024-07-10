import { createAsyncThunk } from "@reduxjs/toolkit"

export const GetPhotos = createAsyncThunk("photos/getPhotosList", async () => {
    try {
        const req = await fetch("https://api.unsplash.com/photos/?client_id=V62APhI108HXA7Ub4sxYeSguncLWI-5zVAh0A4roBpw")
        if (req.ok) {
            const json = await req.json()
            return json
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error)
    }
})