import React, { Component } from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import '../styles/Form.scss'
import '../styles/Modal.scss'
import api from '../services/api'
import { withRouter } from 'react-router-dom'




class CreateNewRoomModal extends Component{

    state = {
        roomName: '',
        isPrivate: false,
        roomPassword: ''
    }

    createRoom = (roomName, isPrivate, password)=> {
        if(!roomName) roomName = undefined;

        api.post('/room/create', {roomName, private: isPrivate, password: password}).then(res =>{
            this.props.history.push('/room/'+ res.data.roomid)
        }).catch((err)=>{
            alert("Choose other name for your room")
        })
    }


    render(){
        const {roomName, roomPassword, isPrivate} = this.state
        return (
            <Modal 
                show={this.props.open} 
                onHide={this.props.onClose} 
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
                                <Form.Label>Room name</Form.Label>
                                <Form.Control 
                                    value={roomName}
                                    onChange={(evt)=>this.setState({roomName: evt.target.value})}
                                    type="text" 
                                    placeholder="Room name (empty for random)" 
                                    className="firefy-form-input"
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check 
                                    onChange={(evt)=>{
                                        const checked = evt.target.checked
                                        this.setState({isPrivate: checked})
                                        if(!checked){
                                            this.setState({oomPassord: ''})
                                        }
                                    }}
                                    checked={isPrivate}
                                    type="checkbox" 
                                    label="Check me out" 
                                />
                            </Form.Group>
                            {isPrivate && (
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Room password</Form.Label>
                                    <Form.Control 
                                        value={roomPassword}
                                        onChange={(evt)=>this.setState({roomPassword: evt.target.value})}
                                        type="text" 
                                        placeholder="Room password" 
                                        className="firefy-form-input"
                                    />
                                </Form.Group>
                            )}
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer className="room-modal-background">
                    <Button 
                    variant="secondary" 
                    onClick={()=>{
                        this.createRoom(roomName, isPrivate, roomPassword)
                    }}
                    >
                    Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}


export default withRouter(CreateNewRoomModal);