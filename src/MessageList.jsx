import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {


  render(){
    console.log("Rendering <MessageList/>");

    return (

        <main className = "messages">
        {this.props.messages.map((message) =>
           <Message message={message} key={message.id} />
        )}
        </main>

    );
  }
}
export default MessageList;