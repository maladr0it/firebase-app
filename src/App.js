import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChatList from './components/ChatList';

class App extends Component {

  render() {
    return (
      <div>
        <ChatList />
        {/* <LoginFormContainer /> */}
        {/* <ChatListContainer /> */}
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