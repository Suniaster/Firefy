import React, {Component} from 'react'
import { Route } from "react-router-dom";
import api from '../services/api';
import Loading from '../components/Loading';
import '../styles/FadeSwitch.css'
import {  CSSTransition, SwitchTransition } from "react-transition-group";


export class ProtectedUserRoute extends Component{

    constructor(props){
        super(props);
        const {component, ...rest} = this.props
        this.rest = rest
    }
    render(){
        return (
            <Route
                {...this.rest}
                render={(props)=> <UserLoggedOnly {...props} component={this.props.component} />}
            />
        )
    }
}


export default class UserLoggedOnly extends Component{
    constructor(props){
        super(props)

        this.state = {
            load: ''
        }
    }

    componentDidMount(){
        const token = localStorage.getItem("@user-auth-token")
        this.setState({load: 'loading'})
        api.get('/user/auth', {headers: {'x-access-token': token}}).then((res)=>{
            let body = res.data
            if(body.auth){
                this.setState({load: 'authorized'})
            }
        }).catch(()=>{
            this.setState({load: 'problem'})
        })
    }

    render(){
        const {load} = this.state
        return (
            <div>
                <SwitchTransition>
                    <CSSTransition
                        key={load}
                        addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                        classNames='fade'
                    >
                    <div>
                        {((load === 'loading') &&(
                            <Loading />
                        ))}
                        {((load === 'authorized') && (
                            <this.props.component />
                        ))}
                        {((load === 'problem') &&(
                            <div>{this.props.history.push('/login')}</div>
                        ))}
                    </div>
                    </CSSTransition>
                </SwitchTransition>
            </div>
        )
    }
}

