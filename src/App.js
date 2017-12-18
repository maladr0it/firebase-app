import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from './components/LoginForm';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';

class App extends Component {

  render() {
    return (
      <div>
        <LoginForm />
        <ChatList />
        <ChatWindow />
        {/* <ChatWindowContainer /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.user.userId,
  chatIdsToListenTo: state.chatApp.chatIds
});

export default connect(mapStateToProps)(App);