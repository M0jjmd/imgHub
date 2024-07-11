import Header from "../components/homePage/Header"
import Footer from "../components/homePage/Footer"
import styles from './HomePage.module.scss'

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { getPhotosData } from "../features/photos/photosSlice"
import { GetPhotos } from "../features/photos/photosThunk"

import { searchPhotosData } from "../features/searchPhotos/searchPhotosSlice"
import { SearchPhotos } from "../features/searchPhotos/searchPhotosThunk"

const HomePage = () => {
    const dispatch = useDispatch()
    const photosData = useSelector(getPhotosData)
    const getSearchPhotosData = useSelector(searchPhotosData)

    const photosStatus = useSelector((state) => state.photos.status)
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
        if (photosStatus === "idle") {
            console.log(dispatch(GetPhotos()));

        } else if (photosStatus === "fulfilled") {
            // console.log(photosData)
            setIsLoading(false);
        }
    }, [photosStatus]);


    const searchInputHandler = (event) => {
        const userInput = event.target.value
        // const filteredPhotos = 
        if (userInput) {
            dispatch(SearchPhotos(userInput))
        }
    }

    return (
        <>
            <Header />
            <>
                <body>
                    <section className={styles.section}>
                        <input
                            type="text"
                            placeholder="Search for images..."
                            onChange={searchInputHandler}
                            className={styles.section__input}
                        />
                        {isLoading ? <p>Loading</p> : photosData.map((el) =>
                            <div className={styles.section__div} >
                                <img src={el.urls.regular} alt={el.alternative_slugs.es} className={styles.section__div__img} />
                            </div>
                        )}
                    </section>
                </body>
            </>
            <Footer />
        </>
    )
}

export default HomePage