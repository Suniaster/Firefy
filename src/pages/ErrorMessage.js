import React, { Component } from 'react'
import Header from '../components/Header'
export default class ErrorMessage extends Component {
    render() {
        return (
            <Header>
                <h1 style={{color: "white"}}>{this.props.message}</h1>
            </Header>
        )
    }
}
