import { createAsyncThunk } from "@reduxjs/toolkit"

const UNSPLASH_ACCESS_KEY = 'V62APhI108HXA7Ub4sxYeSguncLWI-5zVAh0A4roBpw'

export const SearchPhotos = createAsyncThunk("searchPhotos/searchPhotosList", async (query) => {
    try {
        const req = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`)
        if (req.ok) {
            const json = await req.json()
            return json.results
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error)
    }
})