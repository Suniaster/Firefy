import React from 'react'
import '../styles/sidebar.css'

import { FaHome, FaGlobeAmericas, FaUser, FaSignOutAlt } from 'react-icons/fa'

function Item({children}) {
    return(
        <div className="item">
            <div className="selected"/>
            <span>{children}</span>
        </div>
    )
}

export default function Sidebar() {
    return(
        <div className="sidebar-container">
            <div className="title">Firefy</div>
            <Item>
                <FaHome/>
                Homepage
            </Item>
            <Item>
                <FaGlobeAmericas/>
                Rooms
            </Item>
            <Item>
                <FaUser/>
                Profile
            </Item>
            <Item>
                <FaSignOutAlt/>
                Logout
            </Item>
        </div>
    )
}