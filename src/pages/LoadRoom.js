import React, {Component} from 'react'
import api from '../services/api'
import Room from './Room'
import Loading from '../components/Loading'

import '../styles/FadeSwitch.css'
import {  CSSTransition, SwitchTransition } from "react-transition-group";
import ErrorMessage from './ErrorMessage'


export default class LoadRoom extends Component{

    constructor(props){
        super(props)
        let href = window.location.pathname
        this.roomId = href.substring(6)

        this.state = {
            errorMessage: '',
            roomInfo: null,
            load: ''
        }
    }

    componentDidMount(){
        this.setState({load: 'loading'})
        api.get('/room/enter/', {
            params:{
                id: this.roomId,
                password: localStorage.getItem("@room-lastpassword")
            },
            headers:{
                'x-access-token': localStorage.getItem("@user-auth-token")
            }
        }).then((res)=>{
            this.setState({roomInfo: res.data})
            this.setState({load: 'authorized'})
        }).catch((err)=>{
            const { message } = err.response.data
            this.setState({
                load: 'problem',
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
        const {errorMessage, load} = this.state
        return(
            <div>
                <SwitchTransition>
                    <CSSTransition
                        key={load}
                        addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                        classNames='fade'
                    >
                    <div>
                        {((load === 'loading') &&(
                            <Loading />
                        ))}
                        {((load === 'authorized') && (
                            <Room {...this.state.roomInfo}/>
                        ))}
                        {((load === 'problem') &&(
                            <ErrorMessage message={errorMessage}></ErrorMessage>
                        ))}
                    </div>
                    </CSSTransition>
                </SwitchTransition>
            </div>
        )
    }
}