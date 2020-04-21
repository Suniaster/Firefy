import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/rooms.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'

const RoomList = (props) => {

    let roomId = props.roomId
    let user_count =  props.userCount || 0
    let max_capacity =  props.maxCapacity || 99
    return (
        <div className="room-list">
            <div className="icon-container">
                <div className="icon">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div>
                    {user_count}/{max_capacity}
                </div>
            </div>
            <div>
            <Link to={"/room/"+roomId}>{roomId}</Link>
            </div>
        </div>
    )
}


export default RoomList