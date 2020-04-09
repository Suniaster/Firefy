import React, { Component } from "react"
import ReactPlayer from 'react-player'
import '../../pages/room.css'



export default class Player extends Component{
    acceptedLagTime = 0.8

    constructor(props){
        super(props)
        this.socket = this.props.socket

        this.state = {
            source: 'https://www.youtube.com/watch?v=BkPpgMwPss0',
            playing: false,
            inputText: ''
        }
    }

    componentDidMount(){
        this.socket.on("sync", (serverVideoInfo)=>{
            this.syncPlayerWithVideoInfo(serverVideoInfo)
        })
    
        this.socket.on('getHostInfo', (id)=>{
            this.socket.emit("sendInfoServer", this.videoInfo(), id)
        })
    }

    syncPlayerWithVideoInfo(videoInfo){
        const currentTime = this.player.getCurrentTime()
        console.log(videoInfo)
        if(this.state.source !== videoInfo.source){
            this.setState({source: videoInfo.source})
        }

        if( currentTime < videoInfo.time - this.acceptedLagTime
            || currentTime > videoInfo.time + this.acceptedLagTime ){
              this.seek(videoInfo.time)
        }

        this.setState({playing: !videoInfo.paused });
    }

    videoInfo(){
        return {
            paused: !this.player.player.isPlaying,
            time: this.player.getCurrentTime(),
            source: this.state.source
        }
    }

    tryToChangeSource(name){
        if(ReactPlayer.canPlay(name))
            this.socket.emit('changeSource', name)
        else{
            console.log("Nao funciona")
        }
    }

    _handlePlay = () => {
        this.setState({playing: true})
        this.socket.emit("playerStarted", this.videoInfo())
    }

    _handlePause = ()=>{
        this.setState({playing: false})
        this.socket.emit("playerPaused", this.videoInfo())
    }

    _handleSeek = () =>{
        this.socket.emit("playerStarted", this.videoInfo())
    }

    seek(seconds){
        this.player.seekTo(seconds, 'seconds')
    }

    render(){
        const { source, playing } = this.state
        return(
            <div>
                <div className="player-container">
                    <ReactPlayer
                        ref={ref => this.player = ref}
                        url={source}
                        controls={true}
                        playing={playing}
                        onPlay={this._handlePlay}
                        onPause={this._handlePause}
                        onSeek={this._handleSeek}
                    />
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