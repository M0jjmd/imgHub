import Header from "../components/homePage/Header"
import Footer from "../components/homePage/Footer"
import styles from './HomePage.module.scss'
import searchLogo from "../assets/searchLogo.png"

import { saveAs } from 'file-saver'

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { getPhotosData, getPhotosStatus, getPhotosPage, aumentPage, resetPhotos } from "../features/photos/photosSlice"
import { GetPhotos } from "../features/photos/photosThunk"
import { searchPhotosData, getSearchPhotosStatus, getSearchPhotosPage, clearSearchPhotos, incrementSearchPage } from "../features/photos/searchPhotosSlice"

const HomePage = () => {
    const dispatch = useDispatch()

    const photosData = useSelector(getPhotosData)
    const photosStatus = useSelector(getPhotosStatus)
    const photosPage = useSelector(getPhotosPage)

    const searchResults = useSelector(searchPhotosData)
    const searchStatus = useSelector(getSearchPhotosStatus)
    const searchPage = useSelector(getSearchPhotosPage)

    const [isLoading, setIsLoading] = useState(true)
    const [isSearching, setIsSearching] = useState(false)
    const [userText, setUserText] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)

    useEffect(() => {
        if (photosStatus === "idle") {
            dispatch(GetPhotos({ page: photosPage, query: "" }))
        } else if (photosStatus === "fulfilled") {
            setIsLoading(false)
            console.log("fulfilled")
        } else if (photosStatus === "rejected") {
            alert("Error")
        } else if (photosStatus === "pending") {
            //Mostramos unm spinner
        }
        console.log("fulfilled")
        console.log(photosStatus)
    }, [photosStatus])

    /*    useEffect(() => {
            if (searchStatus === "idle") {
                // setIsLoading(true)
            } else if (searchStatus === "fulfilled") {
                setIsLoading(false)
            }
        }, [searchStatus]) */

    const searchInputHandler = (event) => {
        const userInput = event.target.value
        setUserText(userInput)
        if (userInput) {
            setIsSearching(true)
            dispatch(clearSearchPhotos())
            dispatch(GetPhotos({ page: 1, query: userInput }))
        } else {
            setIsSearching(false)
            dispatch(clearSearchPhotos())
            dispatch(resetPhotos())
            dispatch(GetPhotos({ page: 1 }))
        }
    }

    const handleShowMore = () => {
        if (isSearching) {
            dispatch(incrementSearchPage())
            dispatch(GetPhotos({ page: searchPage, query: userText }))
        } else {
            dispatch(aumentPage())
            dispatch(GetPhotos({ page: photosPage }))
        }
    }

    const handleImageClick = (image) => {
        setSelectedImage(image)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedImage(null)
    }

    const handleLiked = (photo) => {
        // const savedPhotos = JSON.parse(localStorage.getItem("savedPhotos")) || []
        // const photoExists = savedPhotos.some(savedPhoto => savedPhoto.id === photo.id)
        // if (!photoExists) {
        //     const updatedSavedPhotos = [...savedPhotos, photo]
        //     localStorage.setItem("savedPhotos", JSON.stringify(updatedSavedPhotos))
        // } else {
        //     console.log("This photo is already saved.")
        // }
        const likedPhotos = JSON.parse(localStorage.getItem("likedPhotos")) || []
        const photoExists = likedPhotos.some(likedPhoto => likedPhoto.id === photo.id)
        if (!photoExists) {
            const updatedLikedPhotos = [...likedPhotos, photo]
            localStorage.setItem("likedPhotos", JSON.stringify(updatedLikedPhotos))
            console.log(updatedLikedPhotos)
        } else {
            console.log("This photo is already saved.")
        }
    }

    const handleDownload = (photo) => {
        saveAs(photo, `photo-${photo.id}.jpg`)
    }

    const displayedPhotos = isSearching ? searchResults : photosData
    console.log(displayedPhotos)
    return (
        <>
            <Header />

            <section className={styles.section}>
                <div className={styles.section__searchContainer}>
                    <img src={searchLogo} alt="Logo" className={styles.section__searchContainer__searchLogo} />
                    <input
                        type="text"
                        placeholder="Search for images..."
                        onChange={searchInputHandler}
                        className={styles.section__searchContainer__input}
                    />
                </div>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {displayedPhotos.map((el) => (
                            el.id ? (
                                <div key={el.id} className={styles.section__div}>
                                    <img
                                        src={el.urls.regular}
                                        alt={el.alt_description}
                                        className={styles.section__div__img}
                                        onClick={() => handleImageClick(el)}
                                    />
                                    <div className={styles.section__div__buttonContainer}>
                                        <button onClick={() => handleLiked(el)} className={styles.section__div__buttonContainer__button}>Like</button>
                                        <button onClick={() => handleDownload(el.urls.full)} className={styles.section__div__buttonContainer__button}>Download</button>
                                    </div>
                                </div>
                            ) : null
                        ))}
                        <button onClick={handleShowMore} className={styles.showMoreButton}>
                            Show More
                        </button>
                    </>
                )}
                {isModalOpen && (
                    <div className={styles.section__modal}>
                        <div className={styles.section__modal__modalContent}>
                            <span className={styles.close} onClick={handleCloseModal}>&times</span>
                            <img src={selectedImage.urls.regular} alt={selectedImage.alt_description} className={styles.section__modal__modalContent__img} />
                        </div>
                    </div>
                )}
            </section>
            <Footer />
        </>
    )
}

export default HomePage