/* eslint-disable no-throw-literal */
import { Component } from "react";



export default class PlayerBase extends Component{

    constructor(props){
        super(props)
        
        this.socket = this.props.socket
        this.acceptedLagTime = 0.8

    }

    __syncPlayerWithVideoInfo(videoInfo){
        throw "__syncPlayerWithVideoInfo não implementado"
    }

    __getHostInfo(id){
        throw "__syncPlayerWithVideoInfo não implementado"
    }

    videoInfo(){
        throw "videoInfo Não implementado"
    }
} 