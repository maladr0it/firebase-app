import React from 'react';
import { connect } from 'react-redux';

import './index.css';

const MessageListComponent = ({ messages }) => {
  // TODO: refactor this
  return (
    <ul className='MessageList'>
      {messages.map((message, i) => (
        <li className='Message' key={i}>
          <div>{message.author} says: </div>
          <div><b>{message.text}</b></div>
          <div>
            {!message.isPending ? message.createdAt.toString() : "sending..."}
          </div>
          <br />
        </li>
      ))}
    </ul>
  );
};

// SELECTORS

// select message objs based on chat Id
const getMessages = (state, chatId) => {
  const chat = selectChat(state, chatId);
  const messages = selectMessages(state, chat.messageIds);
  return messages;
};
// helpers

// TODO: this is a little hacky
const selectChat = (state, chatId) => {
  return state.chats[chatId] || { messageIds: [] }; // TODO: hax
};
const selectMessages = (state, messageIds) => {
  return messageIds.map(id => state.messages[id]);
};


const mapStateToProps = state => ({
  messages: getMessages(state, state.chatApp.selectedChat)
});

const MessageList = connect(
  mapStateToProps,
)(MessageListComponent);

export default MessageList;