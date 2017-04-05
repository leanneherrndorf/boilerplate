import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
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
      console.log(event.target.value);

      const newMessage = {id: this.state.messages.length +1, username: this.state.currentUser.name, content: event.target.value};
      const messages = this.state.messages.concat(newMessage);
      this.socket.send(JSON.stringify(newMessage));
      event.target.value = '';

    }
  }

updateUser = (event) => {
  this.setState({currentUser:{name: event.target.value}})
}

componentDidMount() {
  console.log("componentDidMount <App />");

  this.socket = new WebSocket('ws://0.0.0.0:3001');

  this.socket.onopen = () => {
    console.log("Got a connection!");
  }
  this.socket.onmessage = (messageEvent) => {
    console.log(messageEvent.data);
    const newMessage = JSON.parse(messageEvent.data);
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages})
  }
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
