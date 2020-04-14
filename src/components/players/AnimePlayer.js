import React from "react";
import '../../styles/room.css'

import 'video-react/dist/video-react.css'
import { Player } from 'video-react';
import PlayerBase from "../../utils/PlayerBase";

export default class AnimePlayer extends PlayerBase{

  constructor(props){
    super(props)
    
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
    this.socket.emit('getServerVideoInfo')
  }
  sync = (videoInfo) =>{
    const {player} = this.player.getState()

    const {currentTime} = player

    if(this.state.source !== videoInfo.source){
      this.changeSource(videoInfo.source)
    }

    if( currentTime < videoInfo.time - this.acceptedLagTime
        || currentTime > videoInfo.time + this.acceptedLagTime ){
      this.player.seek(videoInfo.time)
    }

    if((!videoInfo.paused)) 
      this.play();
    else 
      this.pause()
  }

  componentDidUpdate(prevProps, prevState){
    const {player} = this.player.getState()

    if(prevState.player){
      // Toggle pause button
      if(player.paused !== prevState.player.paused){
        //Player has been paused
        if(player.paused){
          this.props.onPause()
        }
        //Player has been started
        else{
          this.props.onPlay()
        }
      }
    }
  }

  videoInfo(){
    const {player} = this.player.getState()
    return{
      paused: player.paused,
      time: player.currentTime,
      source: this.state.source
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
      </div>
    )
  }
}