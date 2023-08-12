import React from "react";
import styles from './Footer.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {

    return(
        <div className={styles.wrapper}>
            <div className={styles.break}></div>
            <div className={styles.contentContainer}>
                <div className={styles.left}>
                    <a href="https://www.linkedin.com/in/mikołaj-lewicki-5975011b8/" target="_blank"><div className={styles.iconContainer}>
                        <FontAwesomeIcon className={styles.icon} icon={faLinkedin} />
                    </div></a>
                    <a href="https://github.com/MikolajLewicki" target="_blank"><div className={styles.iconContainer}>
                        <FontAwesomeIcon className={styles.icon} icon={faGithub} />
                    </div></a>
                    <a href="mailto:mikolajlewicki00@gmail.com" target="_blank"><div className={styles.iconContainer}>
                        <FontAwesomeIcon className={styles.icon} icon={faMailBulk} />
                    </div></a>
                </div>
                <div className={styles.right}>
                    <a href="https://www.linkedin.com/in/mikołaj-lewicki-5975011b8/" target="_blank"><p>{'< Made with 🫀'}</p>
                    <p>{'by Mikołaj Lewicki />'}</p></a>
                </div>
            </div>
        </div>
    )
}

export default Footer