import React, { Component} from 'react';
import Header from '../components/header'

import '../styles/room.css'

import io from 'socket.io-client'
import Chat from '../components/Chat';
import Player from '../components/players/Player';
import AnimePlayer from '../components/players/AnimePlayer'
import ReactPlayer from 'react-player';
import {Modal, Button} from 'react-bootstrap'
import UserContainer from '../components/UsersContainer';
// import AdSense from 'react-adsense';

export default class Room extends Component {
  acceptedLagTime = 1

  /**
   * 
   * @param {{roomId:string}} props 
   * @param {*} context 
   */
  constructor(props, context) {
    super(props, context);

    // this.hostName = "https://firefy-back.herokuapp.com"
    this.hostName = "http://localhost:2000"
    this.roomName = "/room/"+ this.props.roomId

    this.state = {
      socket: undefined,
      isHost: false,
      defaultPlayer: true,
      newSourceInput: '',
      showNameModal: false,
      newNameInput: '',
      changeNameButtonDisabled: false
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

    this.initializeName()

    // Coisa do google ads
    const script = document.createElement('script')
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    script.setAttribute("data-ad-client","ca-pub-7389308630172766");
    document.head.appendChild(script)
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

  changeName = (newName) =>{
    this.socket.emit("changeName", newName)
    localStorage.setItem("@chatName", newName)
  }

  initializeName = () =>{
    let name = localStorage.getItem("@chatName")
    if(name === null){
      this.setState({showNameModal: true})
    }
    else{
      this.changeName(name)
    }
  }

  showModal = () =>{
    this.setState({showNameModal: true})
    this.setState({changeNameButtonDisabled: true})
  }

  dimissModal = () =>{
    this.setState({showNameModal: false})
    // Prevent from modal double open on enter button
    setTimeout(()=> this.setState({changeNameButtonDisabled: false}),
     1000
    )
  }

  render(){
    const {socket, isHost, defaultPlayer, showNameModal, changeNameButtonDisabled} = this.state
    return (
      <div className="room-container">
        <Header/>
        <div className="video-chat-container">
          <div className="video-container">
            {((socket!==undefined) && defaultPlayer) && (
              <Player 
                socket={socket} 
                ref={(ref)=> this.defaultPlayer = ref} 
                onPlay={this._onStartHandler} 
                onPause={this._onPauseHandler} 
              />
            )}
            {((socket!==undefined) && !defaultPlayer) && ( 
              <AnimePlayer 
                socket={socket} 
                ref={(ref)=> this.animePlayer = ref}  
                onPlay={this._onStartHandler} 
                onPause={this._onPauseHandler} 
              /> 
            )}
            {isHost && <div className="host_div">Você é o host</div>}
            <div className="connected-container">
              {(socket!== undefined) && (
                <UserContainer socket={socket}/>
              )}
            </div>
          </div>
          <div style={{height:"100%", width:"100%"}}>
            {(socket!== undefined) && (
              <Chat
                roomName={this.roomName}
                hostName={this.hostName}
                socket={socket}
              />
            )}

            <div className="control-container">

              <input 
                type="text" 
                placeholder="URL"
                value={this.state.newSourceInput} 
                onChange={(e)=>this.setState({newSourceInput: e.target.value})} 
              />

              <div className="button-container">
                <button onClick={this.changeSourceButton}>
                    Trocar vídeo
                </button>
                <button onClick={this.syncButton}>
                    Sincronizar
                </button>
                <Button variant="light"
                  onClick={this.showModal}
                  disabled={changeNameButtonDisabled}
                >
                    Change nick
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Modal show={showNameModal} onHide={this.dimissModal} animation={false}>
          <Modal.Header>
            <Modal.Title>Change nickname</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="Enter new nick"
              value={this.state.newNameInput}
              onChange={(e)=>this.setState({newNameInput: e.target.value})}  
              onKeyDown={(e)=>{
                var code = e.keyCode || e.which;
                if(code === 13) { //13 is the enter keycode
                  this.changeName(this.state.newNameInput)
                  this.dimissModal()
                } 
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={()=>{
                this.changeName(this.state.newNameInput)
                this.dimissModal()
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}