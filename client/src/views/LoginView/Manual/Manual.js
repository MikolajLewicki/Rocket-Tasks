import React from "react";
import styles from './Manual.module.scss'
import blob from '../../../assets/blob.svg'
import Button from "../../../components/Button/Button";
import extension from '../../../assets/Rocket-tasks.zip'
import { useNavigate } from "react-router";

const Manual = () => {
    const navigate = useNavigate()

    return(
        <div className={styles.wrapper}>
            <img src={blob} className={styles.blob} alt="blob" />
            <div className={styles.cardContainer}>
                <div className={styles.content}>
                    <div className={styles.number}>
                        1
                    </div>
                    <div className={styles.title}>Zainstaluj rozszerzenie w przeglądarce</div>
                    <div className={styles.description}>Pobierz aplikacje klikając przycisk poniżej. Rozpakuj folder ZIP. Przejdź na strone chrome://extensions/ i wybierz opcje “Załaduj rozpakowane”. Wybierz folder w którym umieściłeś pliki rozszerzenia. </div>
                </div>
                <a href={extension} download><Button style={{width: '100%'}} text='Pobierz rozszerzenie' /></a>
            </div>
            <div className={styles.cardContainer}>
                <div className={styles.content}>
                    <div className={styles.number}>
                        2
                    </div>
                    <div className={styles.title}>Dodaj swoje pierwsze zadanie</div>
                    <div className={styles.description}>Rozszerzenie było tworzone z myślą o skrzynkach mailowych natomiast na czas testowania jest ono przystosowane do strony stackoverflow. 
                    Wejdz na przykładowy post klikając przycisk poniżej oraz kliknij na docelowej stronie prawym przyciskiem. Po kliknięciu “Oznacz jako sprzedaż” zadanie zostanie przydzielone do następnej osoby w kolejce.   </div>
                </div>
                <a href="https://stackoverflow.com/questions/32553158/detect-click-outside-react-component?rq=1" target="_blank"><Button style={{width: '100%'}} text='Zacznij testować' /></a>
            </div>
            <div className={styles.cardContainer}>
                <div className={styles.content}>
                    <div className={styles.number}>
                        3
                    </div>
                    <div className={styles.title}>Zaloguj się do aplikacjiu</div>
                    <div className={styles.description}>Klikając przycisk poniżej zalogujesz się do panelu aplikacji. Stąd możesz śledzić postęp prac, sprawdzić przydzielone do siebie zadania czy generować wykresy statystyk.  </div>
                </div>
                <Button onClick={() => {navigate('/logIn/gln8ZbmfSL'); document.getElementById('Background').scrollIntoView({behavior: 'smooth', block: 'center'})}}  text='Zaloguj się' />
            </div>
        </div>
    )
}

export default Manual