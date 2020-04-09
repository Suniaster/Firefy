import React, { Component} from 'react';
import Header from '../components/header'

import './room.css'

import io from 'socket.io-client'
import Chat from '../components/Chat';
import Player from '../components/players/Player';

/**
 * videoInfo:
 */


export default class Room extends Component {
  acceptedLagTime = 1

  constructor(props, context) {
    super(props, context);

    this.hostName = "tps://firefy-back.herokuapp.com"
    // this.hostName = "http://localhost:2000"
    this.roomName = "/room"

    this.state = {
      socket: undefined,
      isHost: false
    }
  }

  componentDidMount(){
    let socket = io.connect(this.hostName + this.roomName)
    this.setState({
      socket: socket
    })

    socket.on("ureHost", ()=>{
      this.setState({isHost: true})
    })
  }


  render(){
    return (
      <div className="room-container">
        <Header/>

        {(this.state.socket!==undefined) && <Player socket={this.state.socket} />}
        {this.state.isHost && <div className="host_div">Você é o host</div>}
          <Chat
            roomName={this.roomName}
            hostName={this.hostName}
          />
      </div>
    );
  }
}