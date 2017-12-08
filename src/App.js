import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  listenToChat,
  listenForChats
} from './actions';

import MessageListContainer from './containers/MessageListContainer';
import MessageInputContainer from './containers/MessageInputContainer';
import ChatListContainer from './containers/ChatListContainer'

class App extends Component {
  componentDidMount() {
    // listen for all new chats
    this.props.listenForChats();

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
  chatIdsToListenTo: state.chatApp.chatIds
});

const mapDispatchToProps = dispatch => ({
  listenToChat: chatId => {
    dispatch(listenToChat(chatId));
  },
  listenForChats: () => {
    dispatch(listenForChats());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);