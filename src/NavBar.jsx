import React, {Component} from 'react';

class NavBar extends Component {
  render(){
    console.log("Rendering <ChatBar/>");
    return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <p className="navbar-count">{this.props.count} Users online</p>
    </nav>
    );
  }
}

export default NavBar;