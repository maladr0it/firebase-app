import React from 'react';
import { connect } from 'react-redux';

const MessageList = ({ messages, isSending }) => {
  console.log(isSending);
  return (
    <div>
      {isSending ? 'SENDING' : 'NOT_SENDING'}
      <ul>
        {messages.map((message, i) => (
          <li key={i}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isSending: state.chat.isSending,
    messages: state.chat.messages
  };
};

const ChatMessages = connect(
  mapStateToProps
)(MessageList);

export default ChatMessages;