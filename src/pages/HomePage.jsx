import Header from "../components/homePage/Header"
import Footer from "../components/homePage/Footer"
import styles from './HomePage.module.scss'
import searchLogo from "../assets/searchLogo.png"

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getPhotosData, getPhotosStatus, getPhotosPage, aumentPage, resetPhotos } from "../features/photos/photosSlice";
import { GetPhotos } from "../features/photos/photosThunk";
import { searchPhotosData, getSearchPhotosStatus, getSearchPhotosPage, clearSearchPhotos, incrementSearchPage } from "../features/photos/searchPhotosSlice";

const HomePage = () => {
    const dispatch = useDispatch();

    const photosData = useSelector(getPhotosData);
    const photosStatus = useSelector(getPhotosStatus);
    const photosPage = useSelector(getPhotosPage);

    const searchResults = useSelector(searchPhotosData);
    const searchStatus = useSelector(getSearchPhotosStatus);
    const searchPage = useSelector(getSearchPhotosPage);

    const [isLoading, setIsLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (photosStatus === "idle") {
            dispatch(GetPhotos({ page: photosPage , query: ""}));
        } else if (photosStatus === "fulfilled") {
            setIsLoading(false)
        } else if (photosStatus === "rejected") {
            alert("Error")
        } else if (photosStatus === "pending") {
            //Mostramos unm spinner
        }
    }, [photosStatus]);

    useEffect(() => {
        if (searchStatus === "loading") {
            setIsLoading(true);
        } else if (searchStatus === "succeeded") {
            setIsLoading(false);
        }
    }, [searchStatus]);

    const searchInputHandler = (event) => {
        const userInput = event.target.value;
        if (userInput) {
            setIsSearching(true);
            dispatch(clearSearchPhotos());
            dispatch(GetPhotos({ page: 1, query: userInput }));
        } else {
            setIsSearching(false);
            dispatch(clearSearchPhotos());
            dispatch(resetPhotos());
            dispatch(GetPhotos({ page: 1 }));
        }
    };

    const handleShowMore = () => {
        if (isSearching) {
            dispatch(incrementSearchPage());
            dispatch(GetPhotos({ page: searchPage }));
        } else {
            dispatch(aumentPage());
            dispatch(GetPhotos({ page: photosPage }));
        }
    };

    const displayedPhotos = isSearching ? searchResults : photosData;

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
                            <div key={el.id} className={styles.section__div}>
                                <img src={el.urls.regular} alt={el.alt_description} className={styles.section__div__img} />
                            </div>
                        ))}
                        <button onClick={handleShowMore} className={styles.showMoreButton}>
                            Show More
                        </button>
                    </>
                )}
            </section>
            <Footer />
        </>
    );
};

export default HomePage;