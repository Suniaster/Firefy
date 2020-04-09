
import React, {  Component} from 'react'
import io from 'socket.io-client'
export default class Chat extends Component{

    constructor({roomName, hostName}){
        super()
        this.roomName = roomName
        this.hostName = hostName

        this.state = {
            messages: [{
                id:3, text: 'New Message'
            }],
            inputText: ''
        }
    
    }

    componentDidMount(){
        this.socket = io.connect(this.hostName + this.roomName + '/chat')
        
        this.socket.on("newMessage", (messageObject)=>{
            this.setState({messages:[...this.state.messages, messageObject]})
        })
    }

    render(){
        return (
            <div>
                {this.state.messages.map((message)=>(
                    <div>{message.id}: {message.text}</div>
                ))}

            <input type="text" placeholder="Digite Mensagem" value={this.state.inputText} onChange={(e)=>this.setState({inputText: e.target.value})} />
            <button onClick={()=>{
                this.socket.emit("newMessage", this.state.inputText)
                this.setState({inputText: ''})
            }}>
            Enviar
            </button>
            </div>
        )
    }
}