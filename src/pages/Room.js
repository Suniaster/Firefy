import React, { Component} from 'react';
import Header from '../components/header'

import './room.css'

import io from 'socket.io-client'
import Chat from '../components/Chat';
import DefaultPlayer from '../components/players/DefaultPlayer';

/**
 * videoInfo:
 */


export default class Room extends Component {
  acceptedLagTime = 1

  constructor(props, context) {
    super(props, context);

    this.hostName = "http://localhost:2000"
    this.roomName = "/room"

    this.state = {
      socket: undefined
    }
    // "https://firefy-back.herokuapp.com/"
  }

  componentDidMount(){
    this.setState({
      socket: io.connect(this.hostName + this.roomName)
    })
  }


  render(){
    return (
      <div className="room-container">
        <Header/>
        
        {(this.state.socket!==undefined) && <DefaultPlayer socket={this.state.socket} />}
          <Chat
            roomName={this.roomName}
            hostName={this.hostName}
          />
      </div>
    );
  }
}