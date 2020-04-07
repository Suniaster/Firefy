import React from 'react'
import './header.css'
import { FaBars } from 'react-icons/fa'

import Logo from '../../assets/logo_grey.svg'

export default function Header(){
    return(
        <header className="header-container">
            <button className = "menu">
                <FaBars/>
            </button>
            <div className="company">
                <img src={Logo} alt="🔥" />
                <span>Firefy</span>
            </div>
        </header>
    )

}