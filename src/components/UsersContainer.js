import React, {Component} from 'react'
import Crow from '../assets/images/crown.png'
import Chapeu from '../assets/images/chapeu.png'


export default class UserContainer extends Component{

    constructor(props){
        super(props)
        this.socket = this.props.socket


        this.state = {
            users:{}
        }
    }


    componentDidMount(){

        this.socket.on("getUsersInfo", (usersInfo)=>{
            let newList = this.state.users
            usersInfo.forEach((user)=>{
                newList[user.id] = {
                    name: user.name,
                    host: user.host
                }
            })
            this.setState({users: newList})
        })

        this.socket.on("userConnected", (userInfo)=>{
            let newList = this.state.users
            newList[userInfo.id] = {
                name: userInfo.name,
                host: userInfo.host
            }
            this.setState({users: newList})
        })
        this.socket.on("userDisconnected", (user)=>{
            let newList = this.state.users
            delete newList[user.id]
            this.setState({users: newList})
        })
    }



    render(){
        let listOfUsers = Object.keys(this.state.users).map((userId)=>{
            let user = this.state.users[userId]
            let img = user.host ? Crow : Chapeu
            return (
                <div style={{display:"flex", flexDirection: "column", alignItems:"center", marginLeft: "5px", marginRight: "5px"}} id={user.id}>
                    <img src={img} alt="user" style={{width: '50px', paddingBottom:"10px"}}></img>
                    <span style={{color:"white", fontSize:"10px"}}>{user.name}</span>
                </div>
            )
        })
        return(
            <div style={{display: "flex", alignItems:"center", justifyContent:"center", height: "10vh", overflow:'auto'}}>
               {listOfUsers}
            </div>
        )
    }
}
