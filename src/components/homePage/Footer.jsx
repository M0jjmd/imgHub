import linkedin from '../../assets/linkedin.png'
import pinterest from '../../assets/pinterest.png'
import styles from './Footer.module.scss'

const Footer = () => {
    return <>
        <footer className={styles.footer}>
            <ul className={styles.footer__links}>
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Privacy</a></li>
            </ul>
            <div className={styles.footer__socials}>
                <p>© 2022 imgHub. All rights reserved.</p>
                <div className={styles.footer__socials__img}>
                    <img src={linkedin} alt="Linkedine-logo" />
                    <img src={pinterest} alt="Pinterest-logo" />
                </div>
            </div>
        </footer>

    </>
}

export default Footer