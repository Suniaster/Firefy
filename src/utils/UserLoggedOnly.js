import React, {Component} from 'react'
import { Route } from "react-router-dom";
import api from '../services/api';

export class ProtectedUserRoute extends Component{

    constructor({component, ...rest}){
        super({component, rest: rest});
    }
    render(){
        return (
            <Route
                {...this.props.rest}
                render={(props)=> <UserLoggedOnly {...props} component={this.props.component} />}
            />
        )
    }
}

export default class UserLoggedOnly extends Component{
    constructor(props){
        super(props)

        this.state = {
            loading: true,
            authenticated: false
        }
    }

    componentDidMount(){
        const token = localStorage.getItem("@user-auth-token")
        
        api.get('/user/auth', {headers: {'x-access-token': token}}).then((res)=>{
            let body = res.data
            if(body.auth){
                this.setState({authenticated: true, loading: false})
            }
        }).catch(()=>{
            this.setState({loading: false})
        })
    }

    render(){
        const {loading, authenticated} = this.state
        return (
            <div>
                {(loading && (
                    <h1> LOADING....</h1>
                ))}
               {((!loading && authenticated) && (
                    <this.props.component />
                ))}
                {((!loading && !authenticated) &&(
                    <div>{this.props.history.push('/login')}</div>
                ))}
            </div>
        )
    }
}

