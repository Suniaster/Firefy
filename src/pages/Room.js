import React, { Component} from 'react';
import Header from '../components/Header'

import '../styles/room.css'

import io from 'socket.io-client'
import Chat from '../components/Chat';
import Player from '../components/players/Player';
import AnimePlayer from '../components/players/AnimePlayer'
import ReactPlayer from 'react-player';
import {Modal, Button, Overlay, Tooltip} from 'react-bootstrap'
import UserContainer from '../components/UsersContainer';
// import AdSense from 'react-adsense';

import Clipboard from 'react-clipboard.js'

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
    
    this.href = window.location.href
    
    this.state = {
      socket: undefined,
      defaultPlayer: true,
      newSourceInput: '',
      inputs:{
        newVideo: ''
      },
      modals:{
        newVideo: false,
        queue: false
      },
      overlays:{
        clipboard: false
      }
    }

    this.overlayClipboardRef = React.createRef()

    /// constantes com referencia de cada player
    this.defaultPlayer = React.createRef()
    this.animePlayer = React.createRef()

    /// Variavel para trocar player
    this.player = React.createRef()
  }

  componentDidMount(){
    let user = JSON.parse(localStorage.getItem("@user-info"))
    if(user.username)
      this.socket = io.connect(this.hostName + this.roomName, {query: 'username='+user.username})
    else {
      this.socket = io.connect(this.hostName + this.roomName)
    }
    this.setState({
      socket: this.socket
    })

    this.socket.on('sync', this.__syncPlayer)
    this.socket.on('getOwnerInfo', this.__getOwnerInfo)
    this.socket.emit("syncMe")
  }

  componentWillUnmount(){
    this.socket.close();
  }

  __syncPlayer = (videoInfo) =>{
    const useDefault = ReactPlayer.canPlay(videoInfo.source)
    this.setState({defaultPlayer: useDefault})
    this.player = useDefault ? this.defaultPlayer : this.animePlayer
    
    this.player.sync(videoInfo)
  }

  __getOwnerInfo = (id) =>{
    this.socket.emit("sendOwnerInfoFor",  this.player.videoInfo(), id)
  }

  _onPauseHandler = () => {
    this.socket.emit("playerPaused", this.player.videoInfo())
  }

  _onStartHandler = () => {
    this.socket.emit("playerStarted", this.player.videoInfo())
  }

  changeSourceButton = () =>{
    this.socket.emit('changeSource', this.state.inputs.newVideo)
  }

  syncButton = () =>{
    this.socket.emit("syncMe")
  }

  changeName = (newName) =>{
    this.socket.emit("changeName", newName)
    localStorage.setItem("@chatName", newName)
  }

  initializeName = () =>{
    const {username, chatname} = JSON.parse(localStorage.getItem("@user-info"))

    if(chatname)
      this.changeName(chatname)
    else
      this.changeName(username)
  }

  openModal(modalName){
    if(modalName === 'newVideo'){
      this.setState({modals: {newVideo: true}})
    }
    if(modalName === 'queue'){
      this.setState({modals: {queue: true}})
    }
  }

  dimissModal(modalName){
    if(modalName === 'newVideo'){
      this.setState({modals: {newVideo: false}})
    }
    if(modalName === 'queue'){
      this.setState({modals: {queue: false}})
    }
  }

  render(){
    const {socket, defaultPlayer} = this.state
    return (
      <div>

      <div className="room-container">
        <Header>
        <div className="room-wrapper">
          <div className="content-container">
            <div className="play-wrapper">
              {((socket!==undefined) && defaultPlayer) && (
                <Player 
                  socket={socket} 
                  ref={(ref)=> {this.player = ref;this.defaultPlayer = ref}} 
                  onPlay={this._onStartHandler} 
                  onPause={this._onPauseHandler} 
                />
              )}
              {((socket!==undefined) && !defaultPlayer) && ( 
                <AnimePlayer 
                  socket={socket} 
                  ref={(ref)=> {this.player = ref ; this.animePlayer = ref}}  
                  onPlay={this._onStartHandler} 
                  onPause={this._onPauseHandler} 
                /> 
              )}
            </div>
            {/* <div style={{height: "100%"}}> */}
            <div>
                {(socket!== undefined) && (
                  <UserContainer socket={socket}/>
                )}
            </div>
          </div>

        <div className="control-container">
          <div className="room-title-wrapper">Sala: {this.props.roomId}</div>
            {(socket!== undefined) && (
                <Chat
                  roomName={this.roomName}
                  hostName={this.hostName}
                  socket={socket}
                />
              )}
          <div className="all-button-container">
            <div className="button-smaller-container">
                <button 
                  className="button-smaller"
                  onClick={()=>this.openModal("queue")}
                  >
                  Queue
                </button>
      
                
                <Clipboard 
                  className="button-smaller" 
                  button-href="#"
                  data-clipboard-text={this.href}
                  onSuccess={()=>{
                    this.setState({overlays: {clipboard: true}})
                    setTimeout( () => {this.setState({overlays: {clipboard: false}}); }, 2000);
                  }}
                  >
                    <div ref={this.overlayClipboardRef}>Room Link</div>
                </Clipboard>
                <Overlay target={this.overlayClipboardRef.current} show={this.state.overlays.clipboard} placement="left">
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Copied to clipboard
                    </Tooltip>
                  )}
                </Overlay>
                <button className="button-smaller" onClick={this.syncButton}>
                    Syncronize
                </button>
            </div>
            <div className="button-bigger-container">

              <button className="button-bigger-red"onClick={()=>this.openModal("newVideo")}>
                  Add video
              </button>
              <button className="change-avatar"/>
            </div>
          </div>
        </div>
      </div>
      </Header>
    </div>

        <Modal show={this.state.modals.newVideo} onHide={()=>this.dimissModal('newVideo')} animation={false}>
          <Modal.Header>
            <Modal.Title>Add video to Queue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="Enter video url"
              value={this.state.inputs.newVideo}
              onChange={(e)=>this.setState({ inputs: { newVideo: e.target.value } } )}  
            />
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={()=>{
                // * Trocar video
                this.changeSourceButton()
                this.dimissModal('newVideo')
              }}
            >
              Adicionar a Fila
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.modals.queue} onHide={()=>this.dimissModal('queue')} animation={false}>
          <Modal.Header>
            <Modal.Title>Queue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={()=>{
                // * Trocar video
                this.dimissModal('queue')
              }}
            >
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}