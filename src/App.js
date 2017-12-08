import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  listenToMessages,
} from './actions';

import MessageListContainer from './containers/MessageListContainer';
import MessageInputContainer from './containers/MessageInputContainer';
import ChatListContainer from './containers/ChatListContainer'

class App extends Component {
  componentDidMount() {
    this.props.listenToMessages(this.props.chatId); // for now..
  }

  render() {
    return (
      <div>
        <ChatListContainer />
        <MessageInputContainer />
        <MessageListContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatId: '6PVhc2zNVm7AVpK3yEEg'
  // chatId: state.chat.id
});

const mapDispatchToProps = dispatch => ({
  listenToMessages: chatId => {
    dispatch(listenToMessages(chatId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);