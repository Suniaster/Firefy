import React, {Component} from 'react'
import api from '../services/api'
import Room from './Room'
import Loading from '../components/Loading'



export default class LoadRoom extends Component{

    constructor(props){
        super(props)
        let href = window.location.pathname
        this.roomId = href.substring(6)

        this.state = {
            loading: true,
            problem: false,
            errorMessage: '',
            roomInfo: null
        }
    }

    componentDidMount(){
        api.get('/room/enter/'+this.roomId).then((res)=>{
            this.setState({problem: false,loading: false, roomInfo: res.data})
        }).catch((err)=>{
            const { message } = err.response.data
            this.setState({
                problem: true,
                loading: false,
                errorMessage: message
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
        const {loading, problem, errorMessage} = this.state
        return(
            <div>
                {(!loading && problem ) && <h1 style={{color: "white"}}>{errorMessage}</h1>}
                {(!loading && !problem) && <Room {...this.state.roomInfo}/> }
                {loading && <Loading/>}
            </div>
        )
    }
}