import React, {Component} from 'react'
import Crow from '../assets/images/crown.png'
import Chapeu from '../assets/images/chapeu.png'
import Sasuke from '../assets/images/sasuke2fofo.jpg'
import '../styles/roomtest.css'

import {Button, Popover, OverlayTrigger} from 'react-bootstrap'

export default class UserContainer extends Component{

    constructor(props){
        super(props)
        this.socket = this.props.socket


        this.state = {
            users:{},
            isHost: false
        }
    }


    componentDidMount(){

        this.socket.on("getUsersInfo", (usersInfo)=>{
            let newList = this.state.users
            usersInfo.forEach((user)=>{
                newList[user.id] = {
                    id: user.id,
                    name: user.name,
                    host: user.host
                }
            })
            this.setState({users: newList})
        })

        this.socket.on("userConnected", (userInfo)=>{
            this.updateUser(userInfo)
        })
        this.socket.on("userDisconnected", (user)=>{
            let newList = this.state.users
            delete newList[user.id]
            this.setState({users: newList})
        })

        this.socket.on("updateUser", (user)=>{
            this.updateUser(user)
        })
        this.socket.on("ureHost", ()=>{
            this.setState({isHost: true})
        })
        this.socket.on("lostHost", ()=>{
            this.setState({isHost: false})
        })
    }

    updateUser(userInfo){
        let newList = this.state.users
        newList[userInfo.id] = {
            id: userInfo.id,
            name: userInfo.name,
            host: userInfo.host
        }
        this.setState({users: newList})
    }


    render(){
        let listOfUsers = Object.keys(this.state.users).map((userId)=>{
            let user = this.state.users[userId]
            let img = user.host ? Crow : Chapeu
            
            let changeHostDisabled = this.state.isHost ? 'auto' : 'none'

            let border_color = user.host ? '#EAB100' : '#D4DCE8';
            return (
                <OverlayTrigger
                trigger={["click"]}
                placement="top"
                rootClose={true}
                id={user.id}
                overlay={
                  <Popover>
                    <Popover.Content>
                        <Button onClick={()=>this.socket.emit("changeHost", {newHostId: user.id})}>
                            Pass Host
                        </Button>
                    </Popover.Content>
                  </Popover>
                }>
                    <div className="user-wrapper" style={{ pointerEvents: changeHostDisabled }}>
                        <div className="avatar-wrapper" style={{borderColor: border_color}}>
                            <img src={Sasuke} alt="user"></img>
                        </div>
                        <span>{user.name}</span>
                    </div>
                </OverlayTrigger>
            )
        })
        return(
            <div className="users-container">
               {listOfUsers}
            </div>
        )
    }
}
