import { createAsyncThunk } from "@reduxjs/toolkit"

const UNSPLASH_ACCESS_KEY = 'V62APhI108HXA7Ub4sxYeSguncLWI-5zVAh0A4roBpw'

export const GetPhotos = createAsyncThunk("photos/getPhotosList", async () => {
    try {
        // `https://api.unsplash.com/search/photos?query=${query}&per_page=20&page=10&client_id=${UNSPLASH_ACCESS_KEY}`
        // const req = await fetch("https://api.unsplash.com/photos/?client_id=V62APhI108HXA7Ub4sxYeSguncLWI-5zVAh0A4roBpw")
        const req = await fetch(`https://api.unsplash.com/photos?per_page=20&page=1&client_id=${UNSPLASH_ACCESS_KEY}`)
        if (req.ok) {
            const json = await req.json()
            return json
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error)
    }
})