import React, {Component} from 'react'
import api from '../services/api'
import { Button, Modal , Form} from 'react-bootstrap'
import { withRouter } from "react-router-dom";

import RoomList from '../components/RoomList';
import Header from '../components/Header'

import '../styles/Modal.scss'
class RoomIndex extends Component{

    constructor(props){
        super(props)
        this.state = {
            rooms: [],
            inputRoom: '',
            modals:{
                createRoom: false
            },
            inputs:{
                roomName: ''
            }
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

            <Modal 
                show={this.state.modals.createRoom} 
                onHide={()=>this.changeModal('createRoom', false)} 
                animation
                centered
            >
                <Modal.Header className="room-modal-header">
                    <Modal.Title>Create new Room</Modal.Title>
                </Modal.Header>
                <Modal.Body className="room-modal-background">
                    <div>  
                        <input 
                            className="chat-input"
                            type="text" 
                            placeholder="Room name (empty for random)" 
                            value={this.state.inputs.roomName} 
                            onChange={(e)=>this.setState({inputs: {roomName: e.target.value}})}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer className="room-modal-background">
                    <Button 
                    variant="secondary" 
                    onClick={()=>{
                        this.createRoom()
                        this.dimissModal('createRoom', false)
                    }}
                    >
                    Confirm
                    </Button>
                </Modal.Footer>
            </Modal>


            </Header>
        )
    }
}

export default withRouter(RoomIndex);