import React from 'react'
import './navbar.css'

function Item({children}) {
    return(
        <div className="item">{children}</div>
    )
}

export default function Navbar() {
    return(
        <div className="navbar-container">
            <Item>Salas</Item>
            <Item>Login</Item>
        </div>
    )
}