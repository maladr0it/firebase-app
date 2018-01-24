import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  tagChat,
} from '../../actions';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import InputForm from '../InputForm';

import './index.css';

// add form to add a user by ID
const ChatWindowComponent = ({
  chatId, onTagChat,
}) => (
  <div className="ChatPane">
    chatID: {chatId}
    <InputForm
      label="add tag: "
      handleSubmit={tagName => onTagChat(chatId, tagName)}
    />
    <UserList chatId={chatId} />
    <MessageList chatId={chatId} />
    <MessageInput />
  </div>
);

const mapStateToProps = state => ({
  chatId: state.chatApp.selectedChat,
});
const mapDispatchToProps = ({
  onTagChat: tagChat,
});
const ChatWindow = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatWindowComponent);
export default ChatWindow;

ChatWindowComponent.propTypes = {
  chatId: PropTypes.string,
  onTagChat: PropTypes.func.isRequired,
};
ChatWindowComponent.defaultProps = {
  chatId: '',
};
