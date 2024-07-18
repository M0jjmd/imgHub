import { createAsyncThunk } from "@reduxjs/toolkit"

const UNSPLASH_ACCESS_KEY = 'V62APhI108HXA7Ub4sxYeSguncLWI-5zVAh0A4roBpw'

export const GetPhotos = createAsyncThunk("photos/getPhotos", async (pageInfo) => {
    console.log(pageInfo.page)
    try {
        let req
        if (!pageInfo.query == "") {
            req = await fetch(`https://api.unsplash.com/search/photos?query=${pageInfo.query}&per_page=20&page=${pageInfo.page}&client_id=${UNSPLASH_ACCESS_KEY}`)
        } else {
            req = await fetch(`https://api.unsplash.com/photos?per_page=20&page=${pageInfo.page}&client_id=${UNSPLASH_ACCESS_KEY}`)
        }
        if (req.ok) {
            const json = await req.json()
            return json.results || json
        }
    } catch (error) {
        console.error('Error fetching photos:', error)
        throw Error('Failed to fetch photos.')
    }
})