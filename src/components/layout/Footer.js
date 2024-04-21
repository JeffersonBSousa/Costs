import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa"

import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <FaFacebook />
                </li>
                <li>
                    <FaInstagram />
                </li>
                <li>
                    <FaWhatsapp />
                </li>
            </ul>
            <p className={styles.copy_right}><span>Costs 2024</span> &copy;</p>
        </footer>
    )
}

export default Footer