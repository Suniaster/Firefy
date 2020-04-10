import React, { Component} from 'react';
import Header from '../components/header'

import './room.css'

import io from 'socket.io-client'
import Chat from '../components/Chat';
import Player from '../components/players/Player';
import AnimePlayer from '../components/players/AnimePlayer'
import ReactPlayer from 'react-player';
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
      defaultPlayer: true,
      newSourceInput: ''
    }
  }

  componentDidMount(){
    this.socket = io.connect(this.hostName + this.roomName)
    this.setState({
      socket: this.socket
    })

    this.socket.on("ureHost", ()=>{
      this.setState({isHost: true})
    })
    this.socket.on('sync', this.__syncPlayer)
    this.socket.on('getHostInfo', this.__getHostInfo)
  }

  __syncPlayer = (videoInfo) =>{
    const useDefault = ReactPlayer.canPlay(videoInfo.source)
    this.setState({defaultPlayer: useDefault})
    this.player  = useDefault ? this.defaultPlayer : this.animePlayer
    
    this.player.sync(videoInfo)
  }

  __getHostInfo = (id) =>{
    this.socket.emit("sendInfoServer",  this.player.videoInfo(), id)
  }

  _onPauseHandler = () => {
    this.socket.emit("playerPaused", this.player.videoInfo())
  }

  _onStartHandler = () => {
    this.socket.emit("playerStarted", this.player.videoInfo())
  }

  changeSourceButton = () =>{
    this.socket.emit('changeSource', this.state.newSourceInput)
  }

  syncButton = () =>{
    this.socket.emit("syncMe")
  }

  render(){
    const {socket, isHost, defaultPlayer} = this.state
    return (
      <div className="room-container">
        <Header/>
        <div className="video-chat-container">
          <div className="video-container">
            {((socket!==undefined) && defaultPlayer) && <Player socket={socket} ref={(ref)=> this.defaultPlayer = ref} onPlay={this._onStartHandler} onPause={this._onPauseHandler} />}
            {((socket!==undefined) && !defaultPlayer) && <AnimePlayer socket={socket} ref={(ref)=> this.animePlayer = ref}  onPlay={this._onStartHandler} onPause={this._onPauseHandler} /> }
            {isHost && <div className="host_div">Você é o host</div>}
            <div className="control-container">

              <input type="text" placeholder="URL" value={this.state.newSourceInput} onChange={(e)=>this.setState({newSourceInput: e.target.value})} />

              <div className="button-container">
                  <button onClick={this.changeSourceButton}>
                      Trocar vídeo
                  </button>
                  <button onClick={this.syncButton}>
                      Sincronizar
                  </button>
              </div>
            </div>
          </div>
          <Chat
            roomName={this.roomName}
            hostName={this.hostName}
          />

        </div>
      </div>
    );
  }
}