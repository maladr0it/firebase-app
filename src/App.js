import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  // fetchMessages,
  listenToMessages
} from './actions';

import ChatMessages from './containers/ChatMessages';
import MessageInput from './containers/MessageInput';

class App extends Component {
  componentDidMount() {
    // this.props.fetchMessages(this.props.chatId); // for now..
    this.props.listenToMessages(this.props.chatId); // for now..
  }

  render() {
    return (
      <div>
        <MessageInput />
        <ChatMessages />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatId: state.chat.id
});

const mapDispatchToProps = dispatch => ({
  // fetchMessages: chatId => {
  //   dispatch(fetchMessages(chatId));
  // },
  listenToMessages: chatId => {
    dispatch(listenToMessages(chatId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);