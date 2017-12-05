import React, { Component } from 'react';
import ChatMessages from './containers/ChatMessages';
import MessageInput from './containers/MessageInput';

class App extends Component {

  render() {
    return (
      <div>
        <ChatMessages />
        <MessageInput />
      </div>
    );
  }
}

export default App;