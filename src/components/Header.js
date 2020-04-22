import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/header.css'
import { FaBars, FaArrowLeft } from 'react-icons/fa'

import Sidebar from './Sidebar'

import Logo from '../assets/logov2.svg'

import {  CSSTransition, SwitchTransition } from "react-transition-group";

export default function Header({children}) {
    let history = useHistory()

    function handleMenuClick(e) {
        e.preventDefault();
        if(menuClick === false)
            setMenuClick(true)
        else
            setMenuClick(false)
    }

    function handleExitClick(e) {
        e.preventDefault();
        history.push("/rooms")
    }

    const [menuClick,setMenuClick] = useState(false)
    return(
        <>
        <header className="header-container">
            <button onClick={(e) => handleMenuClick(e)}>
                <FaBars/>
            </button>
            <div className="company">
                <img src={Logo} alt="🔥" />
                <span>Firefy</span>
            </div>
            <button onClick={(e) => handleExitClick(e)}>
                <FaArrowLeft/>
            </button>
        </header>
        <div style={{display:"flex"}}>
            <CSSTransition
                in={menuClick}
                addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                classNames='sideBar'
            >
                <div>
                    <Sidebar/>
                </div>
            </CSSTransition>
            {/* {menuClick && <Sidebar/>} */}
            <div style={{width: "100%"}}>
                {children}
            </div>
        </div>
        </>
    )

}