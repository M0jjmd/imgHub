import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import Footer from "../components/homePage/Footer"
import styles from './LikedPage.module.scss'

import logo from '../assets/logo.png'
import liked from '../assets/mainPageLogo.png'
import length from '../assets/length.png'
import close from '../assets/x.png'


const LikedPage = () => {
    const [likedPhotos, setLikedPhotos] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)

    useEffect(() => {
        const likedPhotosFromStorage = JSON.parse(localStorage.getItem("likedPhotos")) || []
        setLikedPhotos(likedPhotosFromStorage)
        console.log(likedPhotosFromStorage)
    }, [])

    const handleImageClick = (photo) => {
        setSelectedImage(photo)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedImage(null)
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.header__div}>
                    <img src={logo} alt="Logo" className={styles.header__logo} />
                    <h1 className={styles.header__title}>imgHub</h1>
                    <NavLink className={styles.header__gallery} to="/">
                        <img src={liked} alt="Gallery" className={styles.header__gallery__img} />
                    </NavLink>
                </div>
            </header>
            {/* <Header /> */}
            <section className={styles.section}>
                <h2>Saved Photos</h2>
                {likedPhotos.length > 0 ? (
                    likedPhotos.map((photo) => (
                        <div key={photo.id} className={styles.section__div}>
                            <img
                                src={photo.urls.regular}
                                alt={photo.alt_description}
                                className={styles.section__div__img}
                                onClick={() => handleImageClick(photo)}
                            />
                        </div>
                    ))
                ) : (
                    <p>No saved photos found.</p>
                )}
                {isModalOpen && (
                    <div className={styles.section__modal}>
                        <div className={styles.section__modal__modalContent}>
                            <span className={styles.close} onClick={handleCloseModal}>
                                <img src={close} alt="Gallery" className={styles.header__gallery__img} />
                            </span>
                            <img src={selectedImage.urls.regular} alt={selectedImage.alt_description} className={styles.section__modal__modalContent__img} />
                            <div className={styles.section__modal__modalContent__info}>
                                <p>{selectedImage.alt_description}</p>
                                <div className={styles.section__modal__modalContent__info__length}>
                                    <img src={length} alt="" className={styles.lenghtInfo} />
                                    <p className={styles.lenghtInfo}>width: {selectedImage.width} </p>
                                </div>
                                <div className={styles.section__modal__modalContent__info__length}>
                                    <img src={length} alt="" className={styles.lenghtInfo} />
                                    <p className={styles.lenghtInfo}>height: {selectedImage.height} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            <Footer />
        </>
    )
}

export default LikedPage
