import { useDispatch, useSelector } from "react-redux"
import { getPhotosData } from "../../features/photos/photosSlice";

import { useEffect, useState } from "react";
import { GetPhotos } from "../../features/photos/photosThunk";

export const PhotosDisplay = () => {

    const dispatch = useDispatch()
    const photosData = useSelector(getPhotosData)
    const photosStatus = useSelector((state) => state.photos.status)
    const [isLoading, setIsLoading] = useState(true)
    // const photoData = useSelector((state) => state.photos.data);

    useEffect(() => {
        if (photosStatus === "idle") {
            console.log(dispatch(GetPhotos()));

        } else if (photosStatus === "fulfilled") {
            console.log(photosData)
            setIsLoading(false);
        }
    }, [photosStatus]);

    if(isLoading) {
        return (
        
            <>
                <h1>Loading</h1>
            </>
        )
    } else {
        return (
        
            <>
                <h1>Not loading</h1>
            </>
        )
    }
}

export default PhotosDisplay