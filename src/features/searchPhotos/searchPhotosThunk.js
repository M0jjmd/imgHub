import { createAsyncThunk } from "@reduxjs/toolkit"

const UNSPLASH_ACCESS_KEY = 'V62APhI108HXA7Ub4sxYeSguncLWI-5zVAh0A4roBpw'

export const SearchPhotos = createAsyncThunk("searchPhotos/searchPhotosList", async (query) => {
    try {
        console.log(query)
        // const req = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=20&page=10&client_id=${UNSPLASH_ACCESS_KEY}`)
        const req = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=20&page=10&client_id=${UNSPLASH_ACCESS_KEY}`)
        console.log(req)
        if (req.ok) {
            const json = await req.json()
            console.log(json.results)
            return json.results

        }
    } catch (error) {
        console.error('Error al enviar los datos:', error)
    }
})