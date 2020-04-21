import React, { Component } from "react";
import Header from "../components/Header";

import "../styles/roomtest.css";

import io from "socket.io-client";
import Chat from "../components/Chat";
import Player from "../components/players/Player";
import AnimePlayer from "../components/players/AnimePlayer";
import ReactPlayer from "react-player";
import { Modal, Button } from "react-bootstrap";
import UserContainer from "../components/UsersContainer";
// import AdSense from 'react-adsense';

export default class Room extends Component {
  acceptedLagTime = 1;

  /**
   *
   * @param {{roomId:string}} props
   * @param {*} context
   */
  constructor(props, context) {
    super(props, context);

    this.hostName = "https://firefy-back.herokuapp.com";
    // this.hostName = "http://localhost:2000"
    this.roomName = "/room/" + this.props.roomId;

    this.state = {
      socket: undefined,
      isHost: false,
      defaultPlayer: true,
      newSourceInput: "",
      showNameModal: false,
      newNameInput: "",
      changeNameButtonDisabled: false,
    };
  }

  componentDidMount() {
    this.socket = io.connect(this.hostName + this.roomName);
    this.setState({
      socket: this.socket,
    });

    this.socket.on("ureHost", () => {
      this.setState({ isHost: true });
    });
    this.socket.on("sync", this.__syncPlayer);
    this.socket.on("getHostInfo", this.__getHostInfo);

    this.initializeName();
  }

  __syncPlayer = (videoInfo) => {
    const useDefault = ReactPlayer.canPlay(videoInfo.source);
    this.setState({ defaultPlayer: useDefault });
    this.player = useDefault ? this.defaultPlayer : this.animePlayer;

    this.player.sync(videoInfo);
  };

  __getHostInfo = (id) => {
    this.socket.emit("sendInfoServer", this.player.videoInfo(), id);
  };

  _onPauseHandler = () => {
    this.socket.emit("playerPaused", this.player.videoInfo());
  };

  _onStartHandler = () => {
    this.socket.emit("playerStarted", this.player.videoInfo());
  };

  changeSourceButton = () => {
    this.socket.emit("changeSource", this.state.newSourceInput);
  };

  syncButton = () => {
    this.socket.emit("syncMe");
  };

  changeName = (newName) => {
    this.socket.emit("changeName", newName);
    localStorage.setItem("@chatName", newName);
  };

  initializeName = () => {
    let name = localStorage.getItem("@chatName");
    if (name === null) {
      this.setState({ showNameModal: true });
    } else {
      this.changeName(name);
    }
  };

  showModal = () => {
    this.setState({ showNameModal: true });
    this.setState({ changeNameButtonDisabled: true });
  };

  dimissModal = () => {
    this.setState({ showNameModal: false });
    // Prevent from modal double open on enter button
    setTimeout(() => this.setState({ changeNameButtonDisabled: false }), 1000);
  };

  render() {
    const {
      socket,
      isHost,
      defaultPlayer,
      showNameModal,
      changeNameButtonDisabled,
    } = this.state;
    return (
      <div className="room-container">
        <Header>
          <div className="room-wrapper">
            <div className="content-container">
              <div className="play-wrapper">
                {socket !== undefined &&(
                  <AnimePlayer
                    socket={socket}
                    ref={(ref) => (this.animePlayer = ref)}
                    onPlay={this._onStartHandler}
                    onPause={this._onPauseHandler}
                  />
                )}
              </div>

              <div className="users-container">
                <div className="user-wrapper">
                  <div className="avatar-wrapper" />
                  Thiago
                </div>
                <div className="user-wrapper">
                  <div className="avatar-wrapper" />
                  Thiago
                </div>
              </div>
            </div>
            <div className="control-container">
              <div className="room-title-wrapper">Naruto Fanclub</div>
              <div className="chat-container">
                <input placeholder="Say something..."></input>
              </div>
              <div className="all-button-container">
                <div className="button-smaller-container">
                  <button className="button-smaller">Queue</button>
                  <button className="button-smaller">Room Link</button>
                  <button className="button-smaller">Syncronize</button>
                </div>
                <div className="button-bigger-container">
                  <button
                    className="button-bigger-red"
                  >
                    Add video
                  </button>
                  <button className="change-avatar"></button>
                </div>
              </div>
            </div>
          </div>
        </Header>
      </div>
    );
  }
}
