import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class Message extends Component {

  render(){
    console.log("Rendering <Message/>");
    console.log(this.props.message);
    return (
      <div>
      <div className="message system">
        <span>{this.props.message.notification}</span>
      </div>

      <div className="message">
      <span className="message-username">{this.props.message.username}</span>
      <span className="message-content">{this.props.message.content}</span>
      </div>
      </div>
    );
  }
}
export default Message;

