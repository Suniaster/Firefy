import React, {Component} from 'react'
import api from '../services/api'
import { Button } from 'react-bootstrap'
import { withRouter } from "react-router-dom";

import RoomList from '../components/RoomList';
import Header from '../components/Header'
class RoomIndex extends Component{

    constructor(props){
        super(props)
        this.state = {
            rooms: [],
            inputRoom: ''
        }
    }

    componentDidMount(){
        api.get('/rooms').then((res)=>{
            let rooms = res.data
            this.setState({rooms: rooms})
        })
    }

    createRoom = ()=> {
        let roomName = this.state.inputRoom
        if(!roomName) roomName = undefined;

        api.post('/room/create', {roomName}).then(res =>{
            this.props.history.push('/room/'+ res.data.roomid)
        }).catch((err)=>{
            alert("Choose other name for your room")
        })

    }
    render = () =>{
        
        const rooms = this.state.rooms.map((props)=>{
            return (
                <RoomList {...props} />
            )
        })
        return(
            <Header>
            <div className="main-container">
                <div>
                    <input 
                        className="chat-input"
                        type="text" 
                        placeholder="Nome da sala" 
                        value={this.state.inputRoom} 
                        onChange={(e)=>this.setState({inputRoom: e.target.value})}
                    />
                </div>
                <Button onClick={this.createRoom}>Criar sala</Button>

                <div className="rooms-container">
                    <h1 style={{textAlign:"center", marginTop: "30px"}}> Salas: </h1>
                    {rooms}
                </div>
               
            </div>
            </Header>
        )
    }
}

export default withRouter(RoomIndex);