import React, { Component } from 'react';
import { connect } from 'react-redux';

import AccountControls from './components/AccountControls';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';

import './App.css';

class App extends Component {
  render() {
    const isLoggedIn = (this.props.currentUserId);
    return (
      <div className="App">
        <AccountControls isLoggedIn={isLoggedIn} />
        {(isLoggedIn) ? (
          <div className='ChatPaneContainer'>
            <ChatList />
            <ChatWindow />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.user.userId,
});

export default connect(mapStateToProps)(App);