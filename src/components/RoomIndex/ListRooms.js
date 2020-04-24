import React, {Component} from 'react'

import RoomList from './RoomList';
import api from '../../services/api';


export default class ListRooms extends Component{

    state = {
        rooms: []
    }

    componentDidMount(){
        api.get('/rooms').then((res)=>{
            let rooms = res.data
            this.setState({rooms: rooms})
        })
    }

    render(){
        const rooms = this.state.rooms.map((props)=>{
            return (
                <RoomList {...props} />
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