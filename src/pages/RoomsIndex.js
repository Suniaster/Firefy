import React, {Component} from 'react'
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
            },
            roomSearch: '',
            hidePrivate: false,
            hidePublic: false
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
                        <div className="firefy-filter-card">
                            <div className="firefy-card-name">Filters</div>
                            <input 
                                id="search" 
                                placeholder="Search..." 
                                onChange={(e)=>this.setState({roomSearch: e.target.value})}
                            />
                            {/* <label className="checkbox-container">
                                <input type="checkbox" />
                                Hide full
                            </label>
                            <label className="checkbox-container">
                                <input type="checkbox" />
                                Hide private
                            </label> */}
                            <div className="firefy-checkbox-container">
                                <div className="firefy-checkbox-wrapper">
                                    <input
                                    type='checkbox'
                                    id="checkbox1"
                                    />
                                    <label 
                                        for="checkbox1"
                                        onClick={()=> this.setState({hidePublic: !this.state.hidePublic})}
                                        ></label>
                                </div>
                                <label>
                                    Hide Public
                                </label>
                            </div>
                            
                            <div className="firefy-checkbox-container">
                                <div className="firefy-checkbox-wrapper">
                                    <input
                                    type='checkbox'
                                    id="checkbox2"
                                    />
                                    <label for="checkbox2" onClick={()=> this.setState({hidePrivate: !this.state.hidePrivate})}></label>
                                </div>
                                <label>
                                    Hide private
                                </label>
                            </div>

                        </div>
                    </div>    
                    <div className="table-container">
                        <ListRooms 
                            q={this.state.roomSearch}
                            hidePrivate={this.state.hidePrivate}
                            hidePublic={this.state.hidePublic}    
                        />
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