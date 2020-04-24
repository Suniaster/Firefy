import React, {Component} from 'react'

import api from '../../services/api';
import '../../styles/rooms.scss'
import { Link, withRouter } from 'react-router-dom'
import {Modal, Form, Button} from 'react-bootstrap'

import { FaUser, FaLock } from 'react-icons/fa'

class ListRooms extends Component{

    state = {
        rooms: [],
        modalOpen: false,
        passwordInput: ''
    }

    selectedId = ''

    componentDidMount(){
        api.get('/rooms').then((res)=>{
            let rooms = res.data
            console.log(rooms)
            this.setState({rooms: rooms})
        })
    }

    _handleRoomClick(roomId, isPrivate){
        if(isPrivate){
            this.selectedId = roomId
            this.setState({modalOpen: true})
        }
        else{
            this.props.history.push("/room/"+roomId)
        }
    }

    _handlePasswordSubmit = () =>{
        let roomId = this.selectedId
        localStorage.setItem("@room-lastpassword", this.state.passwordInput)
        this.props.history.push("/room/"+roomId)
    }

    render(){
        const rooms = this.state.rooms.map((props)=>{
            const {roomId, userCount, maxCapacity, host, isPrivate} = props
            console.log(props)
            return (
                <button className="room-list" 
                    onClick={()=>this._handleRoomClick(roomId, isPrivate)}>
                    <div className="icon-container">
                        <div className="icon">
                            <FaUser />
                        </div>
                        {isPrivate && (
                            <div className="icon">
                                <FaLock />
                            </div>
                        )}
                        <div>
                            {userCount}/{maxCapacity}
                        </div>
                    </div>
                    <div>
                        <div>{roomId}</div>
                        <div className="host-text">Host: {host}</div>
                    </div>
                </button>
    
            )
        })
        return (
            <div className="rooms-container">
                <h1 style={{textAlign:"center", marginTop: "30px"}}> Salas: </h1>
                {rooms}
            
            <Modal 
                show={this.state.modalOpen} 
                onHide={()=>this.setState({modalOpen:false})} 
                animation
                centered
                >
                <Modal.Header className="room-modal-header">
                    <Modal.Title>Create new Room</Modal.Title>
                </Modal.Header>
                <Modal.Body className="room-modal-background">
                    <div>  
                        <Form>
                            <Form.Group controlId="formInput">
                                <Form.Label>Room require password</Form.Label>
                                <Form.Control 
                                    value={this.state.passwordInput}
                                    onChange={(evt)=>this.setState({passwordInput: evt.target.value})}
                                    type="text" 
                                    placeholder="Room name (empty for random)" 
                                    className="firefy-form-input"
                                />
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer className="room-modal-background">
                    <Button 
                    variant="secondary" 
                    onClick={this._handlePasswordSubmit}
                    >
                    Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
        )
    }
}

export default withRouter(ListRooms)