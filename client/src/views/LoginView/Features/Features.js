import React, {useState, useEffect} from "react";
import styles from './Features.module.scss'
import browser1 from '../../../assets/browser1.png'
import browser2 from '../../../assets/browser2.png'
import browser3 from '../../../assets/browser3.png'

const Features = () => {
    const [currentScreen, setCurrentScreen] = useState(1)
    const [currentImg, setCurrentImg] = useState(browser1)
    const [carouselTime, setCarouselTime] = useState(0)

    useEffect(() => {
        switch (currentScreen){
            case 1:
                setCurrentImg(browser1)
                setCarouselTime(0)
                break;
            case 2:
                setCurrentImg(browser2)
                setCarouselTime(0)
                break;
            case 3:
                setCurrentImg(browser3)
                setCarouselTime(0)
                break;
        }
        
    }, [currentScreen])


    useEffect(() => {
        const interval = setInterval(() => {
            if(carouselTime < 3){
                setCarouselTime(carouselTime + 1);
            }else{
                
                if(currentScreen <3){
                    setCurrentScreen(currentScreen + 1)
                }else{
                    setCurrentScreen(1)
                }
                setCarouselTime(0)
            }
        }, 1500);
        return () => clearInterval(interval)

        
      }, [carouselTime]);
    return(
            <div className={styles.wrapper}>
                <div className={styles.screen}>
                    <div className={styles.top}></div>
                    <div className={styles.bottom}></div>
                    <img className={styles.img} src={currentImg} alt="" />
                </div>
                <div className={styles.descriptionsContainer} >
                    <div className={styles.descriptionCard} style={{borderColor: currentScreen === 1 && 'white'}} onClick={() => {setCurrentScreen(1)}}>
                        <div style={{color: currentScreen !== 1 && 'gray'}} className={styles.title}>Śledź postęp prac</div>
                    </div>
                    <div className={styles.descriptionCard} style={{borderColor: currentScreen === 2 && 'white'}} onClick={() => {setCurrentScreen(2)}}>
                        <div style={{color: currentScreen !== 2 && 'gray'}} className={styles.title}>Filtruj do woli</div>
                    </div>
                    <div className={styles.descriptionCard} style={{borderColor: currentScreen === 3 && 'white'}} onClick={() => {setCurrentScreen(3)}}>
                        <div style={{color: currentScreen !== 3 && 'gray'}} className={styles.title}>Wyciągaj wnioski</div>
                    </div>
                </div>
                <div className={styles.bottomBreak}></div>
            </div>
    )
}

export default Features