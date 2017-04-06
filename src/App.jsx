import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
    //set initial state
  constructor(props) {
    super(props);
    this.state = {
    currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      count: 0
    }
  }

handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      const newMessage = {type: "postMessage", username: this.state.currentUser.name, content: event.target.value};
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

    const data = JSON.parse(messageEvent.data);
    if(data.type ==="incomingMessage" ||data.type === "incomingNotification"){
      const messages = this.state.messages.concat(data);
      this.setState({messages: messages})
    }else if(data.type ==="clientCount"){
      console.log(data.count);
      this.setState({count: data.count})
    }else{
      console.log("error!");
    }
  };
}

render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <NavBar count = {this.state.count} />
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} enter={this.handleKeyPress} leave={this.updateUser} />
      </div>
    );
  }
}
export default App;
