import { saveAs } from 'file-saver'
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from "react"
import { getPhotosData, getPhotosStatus, getPhotosPage, aumentPage, resetPhotos } from "../features/photos/photosSlice"
import { GetPhotos } from "../features/photos/photosThunk"
import { searchPhotosData, getSearchPhotosPage, clearSearchPhotos, incrementSearchPage } from "../features/photos/searchPhotosSlice"

import Footer from "../components/homePage/Footer"
import styles from './HomePage.module.scss'

import searchLogo from "../assets/searchLogo.png"
import logo from '../assets/logo.png'
import liked from '../assets/liked.png'
import heart from '../assets/heart.png'
import redHeart from '../assets/redHeart.png'
import downloadImg from '../assets/download.png'
import close from '../assets/x.png'

const HomePage = () => {
    const dispatch = useDispatch()

    const photosData = useSelector(getPhotosData)
    const photosStatus = useSelector(getPhotosStatus)
    const photosPage = useSelector(getPhotosPage)
    const searchPage = useSelector(getSearchPhotosPage)
    const searchResults = useSelector(searchPhotosData)

    const [isLoading, setIsLoading] = useState(true)
    const [isSearching, setIsSearching] = useState(false)
    const [userText, setUserText] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)

    const [changed, setChanged] = useState(false)

    useEffect(() => {
        if (photosStatus === "idle") {
            dispatch(GetPhotos({ page: photosPage, query: "" }))
        } else if (photosStatus === "fulfilled") {
            setIsLoading(false)
        } else if (photosStatus === "rejected") {
            alert("Error")
        } else if (photosStatus === "pending") {
            setIsLoading(true)
        }
    }, [photosStatus])

    const searchInputHandler = (event) => {
        const userInput = event.target.value
        setUserText(userInput)
        if (userInput) {
            setIsSearching(true)
            dispatch(clearSearchPhotos())
            dispatch(GetPhotos({ page: 1, query: userInput }))
        } else {
            setIsSearching(false)
            dispatch(resetPhotos())
            dispatch(GetPhotos({ page: 1, query: "" }))
        }
    }

    const handleShowMore = () => {
        if (isSearching) {
            const nextPage = searchPage + 1
            dispatch(incrementSearchPage())
            dispatch(GetPhotos({ page: nextPage, query: userText }))
        } else {
            const nextPage = photosPage + 1
            dispatch(aumentPage())
            dispatch(GetPhotos({ page: nextPage, query: "" }))
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
        const likedPhotos = JSON.parse(localStorage.getItem("likedPhotos")) || []
        const photoExists = likedPhotos.some(likedPhoto => likedPhoto.id === photo.id)

        if (!photoExists) {
            const likedPhotoWithTimestamp = {
                ...photo,
                likedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }

            const updatedLikedPhotos = [...likedPhotos, likedPhotoWithTimestamp]
            localStorage.setItem("likedPhotos", JSON.stringify(updatedLikedPhotos))
            setChanged(!changed)
        } else {
            console.log("This photo is already saved.")
        }
    }

    const likedPhoto = (photo) => {
        const likedPhotos = JSON.parse(localStorage.getItem("likedPhotos")) || []
        const photoExists = likedPhotos.some(likedPhoto => likedPhoto.id === photo.id)
        return photoExists
    }

    const handleDownload = (photo) => {
        saveAs(photo, `photo-${photo.id}.jpg`)
    }

    const displayedPhotos = isSearching ? searchResults : photosData
    return (
        <>
            <header className={styles.header}>
                <div className={styles.header__div}>
                    <img src={logo} alt="Logo" className={styles.header__logo} />
                    <h1 className={styles.header__title}>imgHub</h1>
                    <NavLink className={styles.header__liked} to="liked">
                        <img src={liked} alt="Liked images" className={styles.header__liked__img} />
                    </NavLink>
                </div>
            </header>

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
                ) : displayedPhotos.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    <>
                        <div className={styles.photosContainer}>
                            {displayedPhotos.map((el) => (
                                el.id ? (
                                    <div key={el.id} className={styles.section__div}>
                                        <img
                                            src={el.urls.regular}
                                            alt={el.alt_description}
                                            className={styles.section__div__img}
                                            onClick={() => handleImageClick(el)}
                                        />
                                        <div className={styles.section__div__buttonContainer} >
                                            <button onClick={() => handleLiked(el)} className={styles.section__div__buttonContainer__button}>
                                                <img
                                                    src={likedPhoto(el) ? heart : redHeart}
                                                    alt={el.alt_description}
                                                    className={styles.section__div__buttonContainer__button__heart}
                                                />
                                            </button>
                                            <button onClick={() => handleDownload(el.urls.full)} className={styles.section__div__buttonContainer__button}>
                                                <img src={downloadImg} alt={el.alt_description} />
                                            </button>
                                        </div>
                                    </div>
                                ) : null
                            ))}
                        </div>
                        <button onClick={handleShowMore} className={styles.showMoreButton}>
                            Show More
                        </button>
                    </>
                )}
                {isModalOpen && (
                    <div className={styles.section__modal}>
                        <div className={styles.section__modal__modalContent}>
                            <img src={close} alt="Gallery" className={styles.section__modal__modalContent__closeModal} onClick={handleCloseModal} />
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