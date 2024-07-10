import Header from "../components/homePage/Header"
import Footer from "../components/homePage/Footer"
import './HomePage.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getPhotosData } from "../features/photos/photosSlice"
import { GetPhotos } from "../features/photos/photosThunk";

const HomePage = () => {
    const dispatch = useDispatch()
    const photosData = useSelector(getPhotosData)
    const photosStatus = useSelector((state) => state.photos.status)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (photosStatus === "idle") {
            console.log(dispatch(GetPhotos()));

        } else if (photosStatus === "fulfilled") {
            console.log(photosData)
            setIsLoading(false);
        }
    }, [photosStatus]);


    return <>
        <Header />
        <>
            {isLoading ? <p>Loading</p> : photosData.map((el) => <img src={el.urls.regular} alt={el.alternative_slugs.es} />)}
        </>
        <Footer />
    </>
}

export default HomePage