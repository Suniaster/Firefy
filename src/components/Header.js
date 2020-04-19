import React, { useState } from 'react'
import '../styles/header.css'
import { FaBars } from 'react-icons/fa'

import Sidebar from './Sidebar'

import Logo from '../assets/logo_white.svg'

export default function Header() {

    function handleClick(e) {
        e.preventDefault();
        if(menuClick === false)
            setMenuClick(true)
        else
            setMenuClick(false)
    }

    const [menuClick,setMenuClick] = useState(false)
    return(
        <>
        <header className="header-container">
            <button className = "menu" onClick={(e) => handleClick(e)}>
                <FaBars/>
            </button>
            <div className="company">
                <img src={Logo} alt="🔥" />
                <span>Firefy</span>
            </div>
        </header>
        {menuClick && <Sidebar/>}
        </>
    )

}