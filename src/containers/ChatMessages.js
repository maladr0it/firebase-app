import React from 'react';
import { connect } from 'react-redux';

const MessageList = ({ messages }) => {
  return (
    <ul>
      {messages.map((message, i) => (
        <li key={i}>{message.text}</li>
      ))}
    </ul>
  );
}

const mapStateToProps = state => {
  return {
    messages: state.chat
    // chat is just an array of messages for now
  };
};

const ChatMessages = connect(
  mapStateToProps
)(MessageList);

export default ChatMessages;