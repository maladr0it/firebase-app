import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserList from './UserList';
import TagControls from './TagControls';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

import './index.css';

// add form to add a user by ID
const ChatWindowComponent = ({
  chatId,
}) => (
  <div className="ChatPane">
    chatID: {chatId}
    <UserList chatId={chatId} />
    <TagControls chatId={chatId} />
    <MessageList chatId={chatId} />
    <MessageInput />
  </div>
);
const mapStateToProps = state => ({
  chatId: state.chatApp.selectedChat,
});
const ChatWindow = connect(
  mapStateToProps,
  null,
)(ChatWindowComponent);
export default ChatWindow;

ChatWindowComponent.propTypes = {
  chatId: PropTypes.string,
};
ChatWindowComponent.defaultProps = {
  chatId: '',
};
