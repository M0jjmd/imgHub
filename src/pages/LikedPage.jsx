import React, { useState, useEffect } from 'react'
import Header from "../components/homePage/Header"
import Footer from "../components/homePage/Footer"
import styles from './LikedPage.module.scss'

const LikedPage = () => {
    const [likedPhotos, setLikedPhotos] = useState([])

    useEffect(() => {
        const likedPhotosFromStorage = JSON.parse(localStorage.getItem("likedPhotos")) || []
        setLikedPhotos(likedPhotosFromStorage)
        console.log(likedPhotosFromStorage)
    }, [])

    return (
        <>
            <Header />
            <section className={styles.section}>
                <h2>Saved Photos</h2>
                {likedPhotos.length > 0 ? (
                    likedPhotos.map((photo) => (
                        <div key={photo.id} className={styles.section__div}>
                            <img src={photo.urls.regular} alt={photo.alt_description} className={styles.section__div__img} />
                        </div>
                    ))
                ) : (
                    <p>No saved photos found.</p>
                )}
            </section>
            <Footer />
        </>
    )
}

export default LikedPage
