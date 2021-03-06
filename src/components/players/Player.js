import React from "react"
import ReactPlayer from 'react-player'
import '../../styles/room.scss'
import PlayerBase from "../../utils/PlayerBase"


export default class Player extends PlayerBase{
    constructor(props){
        super(props)
        this.state = {
            source: 'https://www.youtube.com/watch?v=BkPpgMwPss0',
            playing: true,
            inputText: ''
        }
        this.dontSendNextMessage = false
    }

    componentDidMount(){
    }

    sync = (videoInfo)=> {
        const currentTime = this.player.getCurrentTime()
        if(this.state.source !== videoInfo.source){
            this.setState({source: videoInfo.source})
        }

        if( currentTime < videoInfo.time - this.acceptedLagTime
            || currentTime > videoInfo.time + this.acceptedLagTime ){
              this.seek(videoInfo.time)
        }

        // Do not send next message because this change will trigger
        // onPlay/onPause events if state changes 
        if(this.state.playing !== !videoInfo.paused){
            this.dontSendNextMessage = true
            this.setState({playing: !videoInfo.paused });
        }
    }

    videoInfo(){
        return {
            paused: !this.player.player.isPlaying,
            time: this.player.getCurrentTime(),
            source: this.state.source
        }
    }

    _handlePlay = () => {
        this.setState({playing: true})

        if(this.dontSendNextMessage){
            this.dontSendNextMessage = false
        }
        else{
            this.props.onPlay()
        }
    }

    _handlePause = ()=>{
        this.setState({playing: false})
        
        if(this.dontSendNextMessage){
            this.dontSendNextMessage = false
        }
        else{
            this.props.onPause()
        }
    }

    seek(seconds){
        this.player.seekTo(seconds, 'seconds')
    }

    render(){
        const { source, playing } = this.state
        return(
            <div className="player-container">
                <ReactPlayer
                    ref={ref => this.player = ref}
                    url={source}
                    controls={true}
                    playing={playing}
                    onPlay={this._handlePlay}
                    onPause={this._handlePause}
                    onSeek={this._handleSeek}
                    width="100%"
                    height="100%"
                />
            </div>
        )
    }
}