import React from 'react'
import '../styles/sidebar.css'

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