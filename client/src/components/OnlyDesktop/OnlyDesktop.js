import React from "react";
import styles from './OnlyDesktop.module.scss'
import {motion} from 'framer-motion'
import { ScaleAndOpacity } from "../../animations/animations";


const OnlyDesktop = () => {

    return(
        <div className={styles.wrapper}>
            <motion.div variants={ScaleAndOpacity} initial="initial" animate="animate" className={styles.content}>
                <h1>Ooops!</h1>
                <h2>Aplikacja jest stworzona na desktop</h2>
                <p>Zmień szerokość okna przeglądarki lub uruchom tryb wyświetlania jak na komputerze</p>
            </motion.div>
        </div>
    )
}

export default OnlyDesktop