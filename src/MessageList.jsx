import React, {Component} from 'react';

class MessageList extends Component {
  render(){
    console.log("Rendering <MessageList/>");
    return (
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
    );
  }
}
export default MessageList;