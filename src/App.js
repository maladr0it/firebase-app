import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMessages } from './actions';

import ChatMessages from './containers/ChatMessages';
import MessageInput from './containers/MessageInput';

class App extends Component {
  componentDidMount() {
    this.props.fetchMessages(this.props.chatId) // for now..
  }

  render() {
    return (
      <div>
        <ChatMessages />
        <MessageInput />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatId: state.chat.id
});

const mapDispatchToProps = dispatch => ({
  fetchMessages: chatId => {
    dispatch(fetchMessages(chatId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);