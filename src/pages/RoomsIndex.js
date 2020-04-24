import React, {Component} from 'react'
import api from '../services/api'
import { Button } from 'react-bootstrap'
import { withRouter } from "react-router-dom";

import RoomList from '../components/RoomList';
import Header from '../components/Header'

import '../styles/RoomIndex.scss'
import CreateNewRoomModal from '../components/RoomIndex/CreateNewRoomModal';

class RoomIndex extends Component{

    constructor(props){
        super(props)
        this.state = {
            rooms: [],
            modals:{
                createRoom: false
            }
        }
    }

    componentDidMount(){
        api.get('/rooms').then((res)=>{
            let rooms = res.data
            this.setState({rooms: rooms})
        })
    }

    changeModal = (modalName, newState) =>{
        this.setState({modals: {[modalName]: newState}})
    }

    render = () =>{
        const rooms = this.state.rooms.map((props)=>{
            return (
                <RoomList {...props} />
            )
        })
        return(
            <Header>
            <div style={{height: "1px", backgroundColor: "rgb(10, 11, 24)"}}></div>
            <div className="main-container">
            
                <Button onClick={()=>this.changeModal('createRoom', true)}>Criar sala</Button>

                <div className="rooms-container">
                    <h1 style={{textAlign:"center", marginTop: "30px"}}> Salas: </h1>
                    {rooms}
                </div>
               
            </div>

            <CreateNewRoomModal 
                open={this.state.modals.createRoom} 
                onClose={()=>this.changeModal('createRoom', false)}
            />

            </Header>
        )
    }
}

export default withRouter(RoomIndex);