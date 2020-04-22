import React from 'react'

import '../styles/loading.css'
import Logo from '../assets/logov2.svg'


export default function LogoPulse (props){
    return (
        <div className="logo-container">
          <div className="logo-animation">
            <img src={Logo} alt="🔥" />
          </div>
        </div>
      )
}