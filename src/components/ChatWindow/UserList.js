import React from 'react';
import { connect } from 'react-redux';

const UserListComponent = ({ userIds }) => {
  return (
    <div>
      USERS: {userIds.map(id => <span key={id}>{id} </span>)}
    </div>
  );
};

const getUserIds = (state, chatId) => {
  const chat = selectChat(state, chatId);
  const userIds = chat.userIds
  return userIds;
};
const selectChat = (state, chatId) => {
  return state.chats[chatId] || { userIds: [] };
};

const mapStateToProps = state => ({
  userIds: getUserIds(state, state.chatApp.selectedChat)
});
const UserList = connect(
  mapStateToProps
)(UserListComponent);

export default UserList;