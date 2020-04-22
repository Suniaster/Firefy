import React from 'react'
import '../styles/sidebar.css'

import { FaHome, FaGlobeAmericas, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { useHistory } from 'react-router-dom';

function Item({children, path}) {
    const history = useHistory()
    return(
        <div className="item" onClick={()=>{history.push(path)}}>
            <div className="selected"/>
            <span>{children}</span>
        </div>
    )
}

export default function Sidebar() {
    return(
        <div className="sidebar-container">
            <div className="title">Firefy</div>
            <Item path="/">
                <FaHome/>
                Homepage
            </Item>
            <Item path="/rooms">
                <FaGlobeAmericas/>
                Rooms
            </Item>
            <Item path="/profile">
                <FaUser/>
                Profile
            </Item>
            <Item path="/logout">
                <FaSignOutAlt/>
                Logout
            </Item>
        </div>
    )
}