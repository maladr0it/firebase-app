import React from 'react';
import { connect } from 'react-redux';

import AddUserForm from './AddUserForm';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

import './index.css';

// add form to add a user by ID
const ChatWindowComponent = ({ chatId }) => {
  return (
    <div className='ChatPane'>
      NAME: {chatId}
      <AddUserForm />
      <UserList />
      <MessageList />
      <MessageInput />
    </div>
  );
};

const mapStateToProps = state => ({
  chatId: state.chatApp.selectedChat
});

const ChatWindow = connect(
  mapStateToProps
)(ChatWindowComponent);

export default ChatWindow;