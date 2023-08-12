import React from "react";
import styles from './About.module.scss'
import cosmonaut from '../../../assets/cosmonaut.png'

const About = () => {

    return(
        <div id="BCAbout" className={styles.wrapper}>
            <div className={styles.left}>
                <div className={styles.title}>Czym jest <br />Rocket Tasks?</div>
                <div className={styles.description}>
                Pomysł na aplikacje powstał podczas mojej pracy w dziale sprzedaży homecloud. Maile od klientów chętnych na zakup gineły pośród maili obsługowych i nie były rozdzielane równomiernie. Rocket Task to aplikacja współpracująca z twoją przeglądarką pozwalająca dystrybuować zadania w zespole sprawiedliwie.
                </div>
            </div>
            <div className={styles.right}>
                <img className={styles.img} src={cosmonaut} alt="Cosmonaut" />
            </div>
        </div>
    )
}

export default About