import React, { Component } from 'react'
import '../styles/home.scss'
import { useHistory } from 'react-router-dom';

import Logo from '../assets/logov2.svg'

import Join from '../assets/undraw_press_play_bx2d.svg'
import Tutorial from '../assets/undraw_online_video_ivvq.svg'
// import Tutorial from '../assets/undraw_online_test_gba7.svg'
import Movie from '../assets/undraw_movie_night_fldd.svg'

const textArray = ["videos","movies","series","animes"]

const FirefyButton = ({children, path}) => {
    const history = useHistory()
    return(
        <button className="home-button-container" onClick={()=>{history.push(path)}}>
            <span>{children}</span>
        </button>
    )
}

class Home extends Component {
    state = {
        textIdx: 0,
    }

    componentDidMount = () => {
        this.timeout = setInterval(() => {
            let currentIdx = this.state.textIdx;
            this.setState({ textIdx: currentIdx + 1 });
        }, 1500);
    }

    componentDidUnmount() {
        clearInterval(this.timeout);
    }

    
    render(){
        let text = textArray[this.state.textIdx % textArray.length];
        return (
            <div className="home-container">
                <div className="home-body-container">
                    <div className="home-header-container">
                        <img src={Logo} alt="Firefy Logo" />
                        <div id="company-name">Firefy</div>
                        <div >|</div>
                        <div className="home-title">watch</div>
                        <div id="title-change">{text}</div>
                        <div className="home-title">together</div>
                    </div>

                    <div className="home-content-container">
                        <div className="content-row">
                            <div className="home-card-container">
                                <div className="text-container">
                                    Looking for a place to watch videos with your friends? 
                                </div>
                                <FirefyButton path="/rooms">
                                    Join now
                                </FirefyButton>
                            </div>
                            <div className="home-image-container">
                                <img src={Join} alt="Woman pressing play button" />
                            </div>
                        </div>
                        <div className="content-row">
                            <div className="home-image-container">
                                <img src={Tutorial} alt="Man looking to play page" />
                            </div>
                            <div className="home-card-container">
                                <div className="text-container">
                                    Don’t know where to start?
                                </div>
                                <button className="home-button-container">
                                    Tutorial
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="footer-container">
                        <img src={Movie} alt="3D glass and popcorn" />  
                        <div className="footer-content-container">
                            <button className="home-footer-button">About us</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Home