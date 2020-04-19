import React, {Component} from 'react'
import api from '../services/api'
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { withRouter } from "react-router-dom";

import '../styles/rooms.css'
import RoomList from '../components/RoomList';

export default class RoomIndex extends Component{

    constructor(props){
        super(props)
        this.state = {
            rooms: [],
            redirect: undefined
        }
    }

    componentDidMount(){
        api.get('/room').then((res)=>{
            let rooms = res.data
            this.setState({rooms: rooms})
        })
    }

    createRoom = ()=> {
        api.get('/room/create').then(res =>{
            this.setState({redirect: (<Redirect to={'/room/'+ res.data.roomid}/>)})
        })
    }
    render = () =>{
        
        const rooms = this.state.rooms.map(({roomId, userCount})=>{
            return (
                <RoomList roomId={roomId} userCount={userCount}/>
            )
        })
        return(
            <div className="main-container">
                <Button onClick={this.createRoom}>Criar sala</Button>

                <div className="rooms-container">
                    <h1 style={{textAlign:"center", marginTop: "30px"}}> Salas: </h1>
                    {rooms}
                </div>
               
                {this.state.redirect}
            </div>
        )
    }
}