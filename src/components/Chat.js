import React, {  Component} from 'react'
import '../styles/room.scss'
import '../styles/chat.css'
export default class Chat extends Component{

    constructor({roomName, hostName, socket}){
        super()
        this.roomName = roomName
        this.hostName = hostName

        this.state = {
            messages: [],
            inputText: ''
        }
        this.socket = socket
    }

    componentDidMount(){
        this.socket.on("newMessage", (messageObject)=>{
            this.setState({messages:[...this.state.messages, messageObject]})
        })
    }

    sendMessage = () => {
      this.socket.emit("newMessage", this.state.inputText)
      this.setState({inputText: ''})
    }

    render(){
        return (
            <div className="chat-container">
              <div>
                {this.state.messages.map((message)=>(
                    <div className="message">
                      <span className="message-user">{message.id}</span> <span className="message-text">{message.text}</span>
                    </div>
                ))}
              </div>
                <input
                  type="text" 
                  className="chat-input"
                  placeholder="Say something..." 
                  value={this.state.inputText} 
                  onChange={(e)=>this.setState({inputText: e.target.value})} 
                  onKeyDown={(e)=>{
                    var code = e.keyCode || e.which;
                    if(code === 13) { //13 is the enter keycode
                        this.sendMessage()
                    } 
                  }}
                >
                </input>
            </div>
        )
    }
}