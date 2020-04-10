import React, { Component } from "react";
import '../../pages/room.css'

import 'video-react/dist/video-react.css'
import { Player } from 'video-react';
import ReactPlayer from "react-player";

export default class AnimePlayer extends Component{

    constructor(props){
        super(props)
        console.log(props)
        this.socket = this.props.socket
        this.state = {
            source: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
            inputText: '',
            playerType: 'default'
          };
          this.play = this.play.bind(this);
          this.pause = this.pause.bind(this);
          this.load = this.load.bind(this);
          this.changeCurrentTime = this.changeCurrentTime.bind(this);
          this.seek = this.seek.bind(this);
          this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
          this.changeVolume = this.changeVolume.bind(this);
          this.setMuted = this.setMuted.bind(this);
      
    }

    componentDidMount(){
        // subscribe state change
        this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    
        this.socket.on("sync", (serverVideoInfo)=>{
          this.syncPlayerWithVideoInfo(serverVideoInfo)
        })
    
        this.socket.on('getHostInfo', (id)=>{
          this.socket.emit("sendInfoServer", this.videoInfo(), id)
        
        })

        this.socket.emit('getServerVideoInfo')
      }
    
      componentDidUpdate(prevProps, prevState){
        if(prevState.player){
    
          // Toggle pause button
          if(this.state.player.paused !== prevState.player.paused){
            //Player has been paused
            if(this.state.player.paused){
              this.socket.emit("playerPaused", this.videoInfo())
            }
            //Player has been started
            else{
              this.socket.emit("playerStarted", this.videoInfo())
            }
          }
           
        }
      }
    
      syncPlayerWithVideoInfo(videoInfo){
        const {currentTime} = this.state.player
    
        if(this.state.source !== videoInfo.source){
          this.changeSource(videoInfo.source)
        }
    
        if( currentTime < videoInfo.time - this.acceptedLagTime
          || currentTime > videoInfo.time + this.acceptedLagTime ){
            this.player.seek(videoInfo.time)
        }
    
        if((!videoInfo.paused)) this.play();
        else this.pause()
    
      }
    
      videoInfo(){
        return{
          paused: this.state.player.paused,
          time: this.state.player.currentTime,
          source: this.state.source,
          defaultPlayer: false
        }
      }
    
      setMuted(muted) {
        return () => {
          this.player.muted = muted;
        };
      }
    
      handleStateChange(state) {
        // copy player state to this component's state
        this.setState({
          player: state
        });
      }
    
      play() {
        this.player.play();
      }
    
      pause() {
        this.player.pause();
      }
    
      load() {
        this.player.load();
      }
    
      changeCurrentTime(seconds) {
        return () => {
          const { player } = this.player.getState();
          this.player.seek(player.currentTime + seconds);
        };
      }
    
      seek(seconds) {
        return () => {
          this.player.seek(seconds);
        };
      }
    
      changePlaybackRateRate(steps) {
        return () => {
          const { player } = this.player.getState();
          this.player.playbackRate = player.playbackRate + steps;
        };
      }
    
      changeVolume(steps) {
        return () => {
          const { player } = this.player.getState();
          this.player.volume = player.volume + steps;
        };
      }
    
      changeSource(name) {
        this.setState({
          source: name
        });
        this.player.load();
      }
    
      tryToChangeSource(name){
        this.socket.emit('changeSource', name, ReactPlayer.canPlay(name))
      }

      render(){
          return(
                <div>
                    <div className="player-container">
                    <Player
                        ref={player => {
                            this.player = player;
                        }}
                        autoPlay
                        >
                        <source src={this.state.source} />
                    </Player>
                    </div>
                    <div className="control-container">

                        <input type="text" placeholder="URL" value={this.state.inputText} onChange={(e)=>this.setState({inputText: e.target.value})} />

                        <div className="button-container">
                            <button onClick={()=>{
                                this.tryToChangeSource(this.state.inputText)
                            }}>
                            Trocar vídeo
                            </button>
                            <button onClick={()=>{this.socket.emit("syncMe")}}>
                            Sincronizar
                            </button>
                        </div>
                    
                    </div>
                </div>
          )
      }
}