import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
    //set initial state
  constructor(props) {
    super(props);
    this.state = {

    currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: "1"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: "2"
        }
      ]
    }
    //this.handleKeyPress=this.handleKeyPress.bind(this);
    //this.updateUser=this.updateUser.bind(this);
  }

handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      console.log(event.target.value);

      const newMessage = {id: this.state.messages.length +1, username: this.state.currentUser.name, content: event.target.value};
      const messages = this.state.messages.concat(newMessage);
      //this.setState({messages: messages})

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
    window.addEventListener('enter', (event) => {
      this.socket.send("Hello");
    });
  }

  setTimeout(() => {
    console.log("Simulating incoming message");
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }, 3000);
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
