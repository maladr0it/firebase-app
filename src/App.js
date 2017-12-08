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
    // temporary
    // eventually put in messageList when loaded?
    this.props.listenToMessages(this.props.listenToChatId);
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
  listenToChatId: state.chatApp.selectedChatId
  // selectedChatId: state.view.selectedChatId,
  // chatId: state.chat.id
});

const mapDispatchToProps = dispatch => ({
  listenToMessages: chatId => {
    dispatch(listenToMessages(chatId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);