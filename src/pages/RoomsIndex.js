import React, {Component} from 'react'
import { Button } from 'react-bootstrap'
import { withRouter } from "react-router-dom";

import Header from '../components/Header'

import '../styles/RoomIndex.scss'
import CreateNewRoomModal from '../components/RoomIndex/CreateNewRoomModal';
import ListRooms from '../components/RoomIndex/ListRooms';

class RoomIndex extends Component{

    constructor(props){
        super(props)
        this.state = {
            modals:{
                createRoom: false
            }
        }
    }


    changeModal = (modalName, newState) =>{
        this.setState({modals: {[modalName]: newState}})
    }

    render = () =>{
        return(
            <Header>
            <div style={{height: "1px", backgroundColor: "rgb(10, 11, 24)"}}></div>
            <div className="main-container">
            
                <Button onClick={()=>this.changeModal('createRoom', true)}>Criar sala</Button>

                
                <ListRooms />
               
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