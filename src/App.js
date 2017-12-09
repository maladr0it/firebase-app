import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  listenToChatForNewMessages,
  listenForChatUpdates
} from './actions';

import ChatListContainer from './containers/ChatListContainer';
import MessageListContainer from './containers/MessageListContainer';
import MessageInputContainer from './containers/MessageInputContainer';

class App extends Component {
  componentDidMount() {
    // listen for all new chats
    this.props.listenForChats(this.props.currentUserId);

    // temporary
    // execute once a chat is added?
    // this.props.chatIdsToListenTo.forEach(id => {
    //   this.props.listenToChat(id);
    // });
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
  currentUserId: state.user.userId,
  chatIdsToListenTo: state.chatApp.chatIds
});

const mapDispatchToProps = dispatch => ({
  listenToChat: chatId => {
    dispatch(listenToChatForNewMessages(chatId));
  },
  listenForChats: userId => {
    dispatch(listenForChatUpdates(userId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);