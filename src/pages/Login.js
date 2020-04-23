import React, {Component} from 'react'
import {  withRouter } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import api from '../services/api';


import '../styles/Login.css'
import { FaArrowLeft } from 'react-icons/fa'

import Logo from '../assets/logov2.svg'

class Login extends Component {

    _handlesuccess = (response) =>{
        const token_id = response.tokenId

        api.post('/user/google/login', {token_id}).then((res)=>{
            let token = res.data.token
            localStorage.setItem("@user-info", JSON.stringify(res.data))
            localStorage.setItem("@user-auth-token", token)
            
            this.props.history.push("/rooms");
        
        }).catch(()=>{
            alert("Problema no Login")
        })
    }

    render(){
        return(
            <div className="page-container">
                <div className="header">
                    <button>
                        <FaArrowLeft/>
                    </button>
                </div>
                <div className="login-body">
                    <div className="companyLogin">
                        <img src={Logo} alt="🔥" />
                        <span>Firefy</span>
                    </div>
                    <div className="form-container">
                        <input
                         className="form-input"
                         placeholder="Email"
                        />
                        <input
                         className="form-input"
                         placeholder="Password"
                        />
                    </div>

                    <div className="buttonContainer">
                       <button
                        className="login-button"

                        >
                        Log in
                        </button>
                    </div>

                    <div className="forgotPassword">
                        <span>Forgot password?</span>
                    </div>
                    <div>
                    <GoogleLogin
                        clientId="388056154502-gorkj09682qam2losvcr3psmh7v7mjm6.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={this._handlesuccess}
                        onFailure={()=>{}}
                    />
                    </div>
                </div>
                <div className="ellipse"></div>
            </div>
        )
    }
} 

export default withRouter(Login);