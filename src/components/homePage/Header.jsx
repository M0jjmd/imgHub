import logo from '../../assets/logo.png'
import liked from '../../assets/liked.png'
import styles from './Header.module.scss'

const Header = () => {
    return <>
        <header className={styles.header}>
            <img src={logo} alt="Logo" className={styles.header__logo} />
            <h1 className={styles.header__title}>imgHub</h1>
            <button className={styles.header__liked}>
                <img src={liked} alt="Liked images" className={styles.header__liked__img} />
            </button>
        </header>
    </>
}

export default Header