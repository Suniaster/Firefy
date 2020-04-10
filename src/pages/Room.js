import React, { Component} from 'react';
import Header from '../components/header'

import './room.css'

import io from 'socket.io-client'
import Chat from '../components/Chat';
import Player from '../components/players/Player';
import AnimePlayer from '../components/players/AnimePlayer'
/**
 * videoInfo:
 */


export default class Room extends Component {
  acceptedLagTime = 1

  constructor(props, context) {
    super(props, context);

    this.hostName = "https://firefy-back.herokuapp.com"
    // this.hostName = "http://localhost:2000"
    this.roomName = "/room"

    this.state = {
      socket: undefined,
      isHost: false,
      defaultPlayer: true
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

    socket.on('changePlayer', (useDefaultPlayer)=>this.setState({defaultPlayer: useDefaultPlayer}))
  }


  render(){
    const {socket, isHost, defaultPlayer} = this.state
    return (
      <div className="room-container">
        <Header/>

        {((socket!==undefined) && defaultPlayer) && <Player socket={socket} />}
        {((socket!==undefined) && !defaultPlayer) && <AnimePlayer socket={socket} />}
        {isHost && <div className="host_div">Você é o host</div>}
          <Chat
            roomName={this.roomName}
            hostName={this.hostName}
          />
      </div>
    );
  }
}