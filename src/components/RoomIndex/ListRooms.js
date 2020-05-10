import React, {Component} from 'react'

import api from '../../services/api';
import '../../styles/rooms.scss'
import { Link, withRouter } from 'react-router-dom'
import {Modal, Form, Button} from 'react-bootstrap'

import { FaLockOpen, FaLock, FaUsers } from 'react-icons/fa'

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
        const rooms = this.state.rooms.reduce((acc, props)=>{
            const {roomId, userCount, maxCapacity, host, isPrivate, roomName} = props
            
            let item = (
                <button className="room-list" 
                    onClick={()=>this._handleRoomClick(roomId, isPrivate)}>
                    <div className="table-item">
                        {roomName}
                    </div>
                    <div className="table-item">
                        {(host == "No Host") ? (<div className="host-text">{host}</div>) : (host)
                        }
                    </div>
                    <div className="table-item">
                        {userCount}/{maxCapacity}
                    </div>
                    <div className="table-item">
                        {isPrivate ?
                            (<div className="icon">
                                <FaLock />
                            </div>) : 
                            (<div className="icon">
                                <FaLockOpen />
                            </div>)}
                    </div>
                </button>
            )
            if(roomName.startsWith(this.props.q)){
                if(isPrivate){
                    if(!this.props.hidePrivate){
                        acc.push(item)
                    }
                }
                if(!isPrivate){
                    if(!this.props.hidePublic){
                        acc.push(item)
                    }
                }
            }

            return acc
        }, [])
        return (
            <div className="rooms-container">
                <div className="table-head">
                    <div className="table-item">Room name</div>
                    <div className="table-item">Owner</div>
                    <div className="table-item"><FaUsers /></div>
                    <div className="table-item">Private</div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="separator" />
                </div>
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