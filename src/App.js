import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from './components/LoginForm';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';

class App extends Component {

  render() {
    const isLoggedIn = (this.props.currentUserId);
    if (isLoggedIn) {
      return (
        <div>
          <ChatList />
          <ChatWindow />
        </div>
      );
    } else {
      return (
        <LoginForm />
      );
    }
  }
}

const mapStateToProps = state => ({
  currentUserId: state.user.userId,
});

export default connect(mapStateToProps)(App);