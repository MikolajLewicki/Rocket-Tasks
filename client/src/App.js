import React, {useState, useEffect} from "react";
import styles from './App.module.scss'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import usersStore from "./zustand/usersStore";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import ListView from "./views/ListView/ListView";
import Modal from "./components/Modal/Modal";
import Menu from "./components/Menu/Menu";
import StatsView from "./views/StatsView/StatsView";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import OnlyDesktop from "./components/OnlyDesktop/OnlyDesktop";
import LoginView from "./views/LoginView/LoginView";

const App = () => {
    const user = usersStore((state) => state.user)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)
    const [entryAnimationEnded, setEntryAnimationEnded] = useState(false)
    const [showContent, setShowContent] = useState(false)
    const [isDesktop, setIsDesktop] = useState(true)

    /// making sure entry animation was played
    useEffect(() => {setTimeout(() => setEntryAnimationEnded(true), 1200)}, [])
    /// checking is user logged
    const isLogged = usersStore((state) => state.user?.length !== 0)
    const checkLogin = usersStore((state) => state.checkLogin)
    useEffect(() => {
        isLogged ? setIsModalOpen(false) : setIsModalOpen(true); setIsMenuOpen(false)}, [isLogged])
    useEffect(() => {checkLogin(setisLoaded)}, [])
    /// if everything is checked and loaded show content
    useEffect(() => {
        if(entryAnimationEnded && isLoaded){
            setShowContent(true)
        }
    },[isLoaded, entryAnimationEnded])
    /// adding resize listener to window
    useEffect(() => {
        window.addEventListener("resize", handleResize, false)
        handleResize()
    }, [])

    /// if window width is less than 1000 show inforation that app is meant for desktop only
    const handleResize = () => {
        if(window.innerWidth < 1000){
            setIsDesktop(false)
        }else{
            setIsDesktop(true)
        }
    }
    
    return(
        <BrowserRouter>
            {isDesktop ? 
                <div className={styles.wrapper} >
                    {showContent ? <>
                    <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
                    {isLogged ? <> 
                        <Header setIsMenuOpen={setIsMenuOpen}/>
                        <Nav setIsModalOpen={setIsModalOpen} />
                        <Menu setIsMenuOpen={setIsMenuOpen} isLogged={isLogged} isMenuOpen={isMenuOpen}/>
                        <Routes>
                            <Route path="*" element={<Navigate to="/tasks" replace />} />
                            <Route path="/tasks/*" element={<ListView setIsModalOpen={setIsModalOpen} />} />
                            <Route path="/statistics" element={<StatsView />} />
                            {user?.isAdmin && <Route path="/users/*" element={<ListView setIsModalOpen={setIsModalOpen}/>} />}
                        </Routes></>
                        :<Routes>
                            <Route path="*" element={<Navigate to="/logIn" replace />} />
                            <Route path="/logIn/*" element={<LoginView />} />
                        </Routes>
                     }</> : 
                    <LoadingScreen />}
                </div>
            : <OnlyDesktop />}
        </BrowserRouter>
    )
}

export default App