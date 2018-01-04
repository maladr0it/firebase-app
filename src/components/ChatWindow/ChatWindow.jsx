import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddUserForm from './AddUserForm';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

import './index.css';

// add form to add a user by ID
const ChatWindowComponent = ({ chatId }) => (
  <div className="ChatPane">
    NAME: {chatId}
    <AddUserForm />
    <UserList chatId={chatId} />
    <MessageList chatId={chatId} />
    <MessageInput />
  </div>
);

const mapStateToProps = state => ({
  chatId: state.chatApp.selectedChat,
});
const ChatWindow = connect(mapStateToProps)(ChatWindowComponent);
export default ChatWindow;

ChatWindowComponent.propTypes = {
  chatId: PropTypes.string.isRequired,
};

