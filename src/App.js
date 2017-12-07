import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  listenToMessages,
} from './actions';

import ChatMessages from './containers/ChatMessages';
import MessageInput from './containers/MessageInput';

class App extends Component {
  componentDidMount() {
    this.props.listenToMessages(this.props.chatId); // for now..
    this.props.listenTo
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
  listenToMessages: chatId => {
    dispatch(listenToMessages(chatId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);