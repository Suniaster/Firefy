import React, {Component} from 'react'
import api from '../services/api'
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { withRouter } from "react-router-dom";

export default class RoomIndex extends Component{

    constructor(props){
        super(props)
        this.state = {
            rooms: [],
            redirect: undefined
        }
    }

    componentDidMount(){
        api.get('/room').then((res)=>{
            let rooms = res.data
            this.setState({rooms: rooms})
        })
    }

    createRoom = ()=> {
        api.get('/room/create').then(res =>{
            this.setState({redirect: (<Redirect to={'/room/'+ res.data.roomid}/>)})
        })
    }
    render(){
        
        const rooms = this.state.rooms.map((roomId)=>{
            return (
                <div><Link to={"/room/"+roomId}>Entrar em: {roomId}</Link></div>
            )
        })
        return(
            <div>
                {rooms}
                <Button onClick={this.createRoom}>Criar sala</Button>
                {this.state.redirect}
            </div>
        )
    }
}