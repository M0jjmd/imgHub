import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { saveAs } from 'file-saver'

import Footer from "../components/homePage/Footer"
import styles from './LikedPage.module.scss'

import logo from '../assets/logo.png'
import liked from '../assets/liked.png'
import mainPageLogo from '../assets/mainPageLogo.png'
import length from '../assets/length.png'
import close from '../assets/x.png'
import edit from '../assets/edit.png'
import deleteImg from '../assets/deleteLogo.png'
import searchLogo from "../assets/searchLogo.png"
import downloadImg from '../assets/download.png'


const LikedPage = () => {
    const [likedPhotos, setLikedPhotos] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [newDescription, setNewDescription] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [orderBy, setOrderBy] = useState('likes')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const likedPhotosFromStorage = JSON.parse(localStorage.getItem("likedPhotos")) || []
        setLikedPhotos(likedPhotosFromStorage)
    }, [setIsEditing])

    const handleImageClick = (photo) => {
        setSelectedImage(photo)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedImage(null)
    }

    const handleOrderByChange = (event) => {
        setOrderBy(event.target.value)
        const sortedPhotos = [...likedPhotos].sort((a, b) => {
            switch (event.target.value) {
                case 'likes':
                    return b.likes - a.likes
                case 'width':
                    return b.width - a.width
                case 'height':
                    return b.height - a.height
                case 'date':
                    return new Date(b.likedAt) - new Date(a.likedAt)
                default:
                    return 0
            }
        })
        setLikedPhotos(sortedPhotos)
    }

    const handleEdit = () => {
        if (selectedImage) {
            if (newDescription) {
                const savedPhotos = JSON.parse(localStorage.getItem("likedPhotos")) || []
                const updatedPhotos = savedPhotos.map(photo => {
                    if (photo.id === selectedImage.id) {
                        return { ...photo, alt_description: newDescription }
                    }
                    return photo
                })

                localStorage.setItem("likedPhotos", JSON.stringify(updatedPhotos))
                setLikedPhotos(updatedPhotos)
                setIsEditing(false)
                setIsModalOpen(false)
                setSelectedImage(null)
            } else {
                setIsEditing(false)
            }
        }
    }

    const handleDelete = (id) => {
        const savedPhotos = JSON.parse(localStorage.getItem("likedPhotos")) || []
        const updatedPhotos = savedPhotos.filter(photo => photo.id !== id)
        localStorage.setItem("likedPhotos", JSON.stringify(updatedPhotos))
        setLikedPhotos(updatedPhotos)
        handleCloseModal()
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleDownload = (photo) => {
        saveAs(photo, `photo-${photo.id}.jpg`)
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.header__div}>
                    <img src={logo} alt="Logo" className={styles.header__logo} />
                    <h1 className={styles.header__title}>imgHub</h1>
                    <NavLink className={styles.header__gallery} to="/">
                        <img src={mainPageLogo} alt="Gallery" className={styles.header__gallery__img} />
                    </NavLink>
                </div>
            </header>

            <section className={styles.section}>
                <div className={styles.section__searchContainer}>
                    <img src={searchLogo} alt="Logo" className={styles.section__searchContainer__searchLogo} />
                    <input
                        type="text"
                        placeholder="Search for images..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={styles.section__searchContainer__input}
                    />
                </div>

                <h2>Saved Photos</h2>

                <div className={styles.section__orderBySelector}>
                    <label htmlFor="orderBy" className={styles.section__orderBySelector__label}>Order by:</label>
                    <select id="orderBy" className={styles.section__orderBySelector__select} value={orderBy} onChange={handleOrderByChange} >
                        <option value="likes">Likes</option>
                        <option value="width">Width</option>
                        <option value="height">Height</option>
                        <option value="date">Date</option>
                    </select>
                </div>

                <div className={styles.photosContainer}>
                    {likedPhotos.length > 0 ? (
                        searchTerm ? (

                            likedPhotos
                                .filter((photo) => photo.alt_description.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((photo) => (
                                    <div key={photo.id} className={styles.photosContainer__div}>
                                        <img
                                            src={photo.urls.regular}
                                            alt={photo.alt_description}
                                            className={styles.photosContainer__div__img}
                                            onClick={() => handleImageClick(photo)}
                                        />
                                        <div className={styles.photosContainer__div__buttonContainer}>
                                            <button onClick={() => handleDownload(photo.urls.full)} className={styles.photosContainer__div__buttonContainer__downloadImg}>
                                                <img src={downloadImg} alt={photo.alt_description} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                        ) : (

                            likedPhotos.map((photo) => (
                                <div key={photo.id} className={styles.photosContainer__div}>
                                    <img
                                        src={photo.urls.regular}
                                        alt={photo.alt_description}
                                        className={styles.photosContainer__div__img}
                                        onClick={() => handleImageClick(photo)}
                                    />
                                    <div className={styles.photosContainer__div__buttonContainer}>
                                        <button onClick={() => handleDownload(photo.urls.full)} className={styles.photosContainer__div__buttonContainer__downloadImg}>
                                            <img src={downloadImg} alt={photo.alt_description} />
                                        </button>
                                    </div>
                                </div>

                            ))
                        )
                    ) : (
                        <p>No saved photos found.</p>
                    )}
                </div>

                {isModalOpen && (
                    <div className={styles.section__modal}>
                        <div className={styles.section__modal__modalContent}>
                            <div>
                                <span className={styles.close} onClick={handleCloseModal}>
                                    <img src={close} alt="Gallery" className={styles.header__gallery__img} />
                                </span>
                            </div>
                            <img src={selectedImage.urls.regular} alt={selectedImage.alt_description} className={styles.section__modal__modalContent__img} />

                            <div className={styles.section__modal__modalContent__info}>
                                <p className={styles.section__modal__modalContent__info__p}>{selectedImage.alt_description}</p>

                                <div className={styles.section__modal__modalContent__info__length}>
                                    <img src={liked} alt="likes" className={styles.lenghtInfo} />
                                    <p className={styles.lenghtInfo}>likes: {selectedImage.likes} </p>
                                </div>

                                <div className={styles.section__modal__modalContent__info__length}>
                                    <img src={length} alt="width" className={styles.lenghtInfo} />
                                    <p className={styles.lenghtInfo}>width: {selectedImage.width} </p>
                                </div>

                                <div className={styles.section__modal__modalContent__info__length}>
                                    <img src={length} alt="height" className={styles.lenghtInfo} />
                                    <p className={styles.lenghtInfo}>height: {selectedImage.height} </p>
                                </div>

                                <div className={styles.section__modal__modalContent__info__length}>
                                    <p className={styles.lenghtInfo}>{selectedImage.likedAt} </p>
                                </div>

                                <div className={styles.section__modal__modalContent__info__buttonContainer}>
                                    {isEditing ? (
                                        <div className={styles.section__modal__modalContent__info__buttonContainer__input}>
                                            <input
                                                type="text"
                                                value={newDescription}
                                                onChange={(e) => setNewDescription(e.target.value)}
                                                className={styles.section__modal__modalContent__info__input}
                                            />
                                            <button onClick={handleEdit} className={styles.section__div__buttonContainer__button}>Save</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => setIsEditing(true)} className={styles.buttonContainer__button}>
                                            <img src={edit} alt="edit" className={styles.buttonContainer__button__img} />
                                        </button>
                                    )}
                                    <button onClick={() => handleDelete(selectedImage.id)} className={styles.buttonContainer__button}>
                                        <img src={deleteImg} alt="delete" className={styles.buttonContainer__button__img} />
                                    </button>
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