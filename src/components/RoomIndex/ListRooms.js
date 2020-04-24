import React, {Component} from 'react'

import RoomList from './RoomList';
import api from '../../services/api';
import '../../styles/rooms.css'
import { Link } from 'react-router-dom'


import { FaHome, FaGlobeAmericas, FaUser, FaSignOutAlt } from 'react-icons/fa'

export default class ListRooms extends Component{

    state = {
        rooms: []
    }

    componentDidMount(){
        api.get('/rooms').then((res)=>{
            let rooms = res.data
            console.log(rooms)
            this.setState({rooms: rooms})
        })
    }

    render(){
        const rooms = this.state.rooms.map((props)=>{
            let roomId = props.roomId
            let user_count =  props.userCount || 0
            let max_capacity =  props.maxCapacity || 99
            return (
                <div className="room-list">
                    <div className="icon-container">
                        <div className="icon">
                            <faUser />
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
        })
        return (
            <div className="rooms-container">
                <h1 style={{textAlign:"center", marginTop: "30px"}}> Salas: </h1>
                {rooms}
            </div>

        )
    }
}