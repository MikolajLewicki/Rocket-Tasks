import React, {useState, useEffect} from "react";
import styles from './Background.module.scss'
import pic1 from '../../../assets/1.png'
import pic2 from '../../../assets/2.png'
import pic4 from '../../../assets/4.png'
import pic5 from '../../../assets/5.png'
import pic6 from '../../../assets/6.png'
import pic7 from '../../../assets/7.png'

const Background = () => {
    
    const [asteroids, setAsteroids] = useState(
        [<img src={pic1} className={styles.asteroid} dataValue="-2" alt="" />,
        <img src={pic2} className={styles.asteroid} dataValue="6" alt="" />,
        <img src={pic4} className={styles.asteroid} dataValue="-6" alt="" />,
        <img src={pic5} className={styles.asteroid} dataValue="8" alt="" />,
        <img src={pic6} className={styles.asteroid} dataValue="-4" alt="" />,
        <img src={pic7} className={styles.asteroid} dataValue="5" alt="" />,]
    )

    return(
        <div id="Background" className={styles.wrapper} >
            {asteroids.map(item => item)}
        </div>
    )
}

export default Background