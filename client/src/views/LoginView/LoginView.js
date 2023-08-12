import React from "react";
import styles from './LoginView.module.scss'
import About from "./About/About";
import Features from "./Features/Features";
import Manual from "./Manual/Manual";
import Footer from "./Footer/Footer";
import Background from './Background/Background'
const LoginView = () => {

    return(
        <div className={styles.wrapper}>
            <Background />
            <About />
            <Features />
            <Manual />
            <Footer />
        </div>
    )
}

export default LoginView