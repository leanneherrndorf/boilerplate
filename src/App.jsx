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
    this.handleKeyPress=this.handleKeyPress.bind(this);
    this.updateUser=this.updateUser.bind(this);
  }

handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      console.log(event.target.value);

      const newMessage = {id: this.state.messages.length +1, username: this.state.currentUser.name, content: event.target.value};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages})

    }
  }

updateUser = (event) => {
  this.setState({currentUser:{name: event.target.value}})
}

// in App.jsx
componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
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
