import React, {Component} from 'react'
import Crow from '../assets/images/crown.png'
import Chapeu from '../assets/images/chapeu.png'
import Sasuke from '../assets/images/sasuke2fofo.jpg'
import '../styles/room.css'

import {Button, Popover, OverlayTrigger} from 'react-bootstrap'

export default class UserContainer extends Component{

    constructor(props){
        super(props)
        this.socket = this.props.socket


        this.state = {
            users:{},
            role: 'Watcher'
        }
    }


    componentDidMount(){

        this.socket.on("getUsersInfo", (usersInfo)=>{
            let newList = this.state.users
            usersInfo.forEach((user)=>{
                newList[user.id] = {
                    id: user.id,
                    name: user.name,
                    role: user.role
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
    }

    updateUser(userInfo){
        let newList = this.state.users
        newList[userInfo.id] = {
            id: userInfo.id,
            name: userInfo.name,
            role: userInfo.role
        }
        this.setState({users: newList})
    }


    render(){
        let listOfUsers = Object.keys(this.state.users).map((userId)=>{
            let user = this.state.users[userId];
            let img;
            if(user.role === "Watcher"){
                img = Sasuke;
            }
            else{
                if(user.role === "Moderator"){
                    img = Chapeu;
                }
                else{
                    img = Crow
                }
            }
            let border_color = user.role === "Owner" ? '#EAB100' : '#D4DCE8';
            return (
                <OverlayTrigger
                trigger={["click"]}
                placement="top"
                rootClose={true}
                id={user.id}
                overlay={
                  <Popover>
                    <Popover.Content>
                        <Button onClick={()=>this.socket.emit("changeRole", {userId: user.id, role: 'Moderator'})}>
                            Give Moderator
                        </Button>
                    </Popover.Content>
                  </Popover>
                }>
                    <div className="user-wrapper" style={{ pointerEvents: 'auto' }}> {/*none para desabilitar*/}
                        <div className="avatar-wrapper" style={{borderColor: border_color}}>
                            <img src={img} alt="user"></img>
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
