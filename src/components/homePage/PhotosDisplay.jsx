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
                {isLoading ? <p>Loading</p> : photosData.map((el) => <img src={el.urls.raw} alt={el.alternative_slugs.es}/>)}
            </>
        )
    }
}

export default PhotosDisplay