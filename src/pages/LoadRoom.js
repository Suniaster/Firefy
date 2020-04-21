import React, {Component} from 'react'
import api from '../services/api'
import Room from './Room'



export default class LoadRoom extends Component{

    constructor(props){
        super(props)
        let href = window.location.pathname
        this.roomId = href.substring(6)

        this.state = {
            loading: true,
            problem: false
        }
    }

    componentDidMount(){
        api.get('/room/info/'+this.roomId).then((res)=>{
            this.setState({problem: false,loading: false})
        }).catch((err)=>{
            this.setState({
                problem: true,
                loading: false
            })
        })
    }

    listIncludes(rooms ,roomId){
        for(let i=0;i<rooms.length;i+=1){
            if(roomId == rooms[i].roomId)
            return true
        }
        return false
    }

    render(){
        const {loading, problem} = this.state
        return(
            <div>
                {(!loading && problem ) && <h1 style={{color: "white"}}>Sala {this.roomId} não existe</h1>}
                {(!loading && !problem) && <Room roomId={this.roomId}/> }
                {loading && <h1>Carregando</h1>}
            </div>
        )
    }
}