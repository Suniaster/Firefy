import React, {Component} from 'react'
import { Button, Form } from 'react-bootstrap'
import { withRouter } from "react-router-dom";

import { FaRedoAlt } from 'react-icons/fa'

import "../styles/RoomList.scss";

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
                <div className="room-list-container">
                    <div className="button-container">
                        <div className="menu-button" onClick={()=>this.changeModal('createRoom', true)}>
                            <b>Create New Room</b>
                        </div>
                        <div className="menu-button">
                            <FaRedoAlt />
                            Refresh
                        </div>
                        <div className="card">
                            <div className="card-name">Filters</div>
                            <input id="search" placeholder="Search..."/>
                            {/* <label className="checkbox-container">
                                <input type="checkbox" />
                                Hide full
                            </label>
                            <label className="checkbox-container">
                                <input type="checkbox" />
                                Hide private
                            </label> */}
                            <Form.Check 
                                type="switch"
                                id="checkbox-container"
                                label="Hide full"
                            />
                            <Form.Check 
                                type="switch"
                                id="checkbox-container"
                                label="Hide private"
                            />
                        </div>
                    </div>    
                    <div className="table-container">
                        <ListRooms />
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