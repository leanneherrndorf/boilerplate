import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
//import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
    //set initial state
  constructor(props) {
    super(props);
    this.state = {
    currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }

handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      //console.log(event.target.value);
      const newMessage = {type: "postMessage", username: this.state.currentUser.name, content: event.target.value};
      //const messages = this.state.messages.concat(newMessage);
      this.socket.send(JSON.stringify(newMessage));
      event.target.value = '';
    }
  }

updateUser = (event) => {
  let prevName = this.state.currentUser.name;
  let newName = event.target.value;
  const notification = `${prevName} has changed their name to ${newName}`;
  const newUser = {type: "postNotification", notification: notification};
  this.socket.send(JSON.stringify(newUser));
  this.setState({currentUser:{name: newName}})

}

componentDidMount() {
  console.log("componentDidMount <App />");

  this.socket = new WebSocket('ws://0.0.0.0:3001');

  this.socket.onopen = (event) => {
    console.log("Got a connection!");
  };
  this.socket.onmessage = (messageEvent) => {
    //console.log(messageEvent.data);
    const data = JSON.parse(messageEvent.data);
    const messages = this.state.messages.concat(data);
    this.setState({messages: messages})

    // switch(data.type) {
    //   case "incomingMessage":
    //     const messages = this.state.messages.concat(data);
    //     this.setState({messages: messages})
    //   break;

    //   case "incomingNotification":
    //     const notification =this.state.messages.concat(data);
    //     this.setState({messages: notification})
    //   break;

    //   default:
    //     throw new Error("Unknown event type "+ data.type);
    // }
  };
}

render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} enter={this.handleKeyPress} leave={this.updateUser} />
      </div>
    );
  }
}
export default App;
