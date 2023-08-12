import React, {useState, useEffect} from "react";
import styles from './LogIn.module.scss'
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import { motion, AnimatePresence } from 'framer-motion'
import { Opacity } from "../../../animations/animations";
import Logo from '../../../assets/logo.svg'
import usersStore from "../../../zustand/usersStore";
import { useLocation } from "react-router";

const LogIn = () => {
    const location = useLocation().pathname

    const logIn = usersStore(state => state.logIn)

    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        mail: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
        setError("")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        logIn(formData, setError)
    }

    useEffect(() => {
        if(location.includes('/logIn/gln8ZbmfSL')){
            for(let i = 0; i < 'pies@rocket-tasks.pl'.length +1; i++){
                setTimeout(() => {
                    setFormData({
                        mail: 'pies@rocket-tasks.pl'.slice(0, i),
                        password: i < 'w4nTo7Yj'.length + 1 ? 'w4nTo7Yj'.slice(0, i) : 'w4nTo7Yj',

                    })}, 150 * i);
            }
            setTimeout(() => {
                document.getElementById('Form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
            }, 3250)
        }
    }, [location])

    return(
        <form id='Form' className={styles.wrapper} onSubmit={handleSubmit}>
            <div className={styles.title}>Zaloguj się</div>
            <div className={styles.content}>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} src={Logo} alt="Logo" />
                    <p className={styles.logoText}>Rocket Tasks</p>
                </div> 
                <Input onChange={handleChange} value={formData.mail} name="mail" required
                style={{width: "100%"}}  placeholder="E-mail" type="email"/>
                <Input onChange={handleChange} value={formData.password} name="password" required
                style={{width: "100%"}}  placeholder='Hasło' type="password" />
                <div className={styles.errorContainer}>
                    <AnimatePresence>
                        {error !== "" && <motion.p variants={Opacity} initial="initial" animate="animate" exit="initial">{error}</motion.p>}
                    </AnimatePresence>
                </div>
            </div>
            <div className={styles.buttons}>
                <Button style={{width: "100%"}} submit secondary text={"Zaloguj się"}/>
                <Button style={{width: "100%", marginTop: '1rem'}} onClick={() => {document.getElementById('BCAbout').scrollIntoView({behavior: 'smooth', block: 'center'})}}  text={"Dowiedz się więcej"}/>
            </div>
        </form>
        )
}
export default LogIn