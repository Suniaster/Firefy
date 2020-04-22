import React, {Component} from 'react'
import {  withRouter } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import api from '../services/api';

class Login extends Component {

    constructor(props){
        super(props);
    }

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
            <div>
                Login
                <div style={{marginTop:"100px", marginLeft: "100px"}}>
                    <GoogleLogin
                        clientId="388056154502-gorkj09682qam2losvcr3psmh7v7mjm6.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={this._handlesuccess}
                        onFailure={()=>{}}
                    
                        // cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
        )
    }
} 

export default withRouter(Login);