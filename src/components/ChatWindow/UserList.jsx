import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const UserListComponent = ({ usersData }) => {
  const users = usersData.map(userData => (
    <span key={userData.id}>
      {userData.id}
    </span>
  ));
  return (
    <div>
      USERS: {users}
    </div>
  );
};

const selectChat = (state, chatId) => (
  state.chats[chatId] || { userIds: [], users: {} }
  // TODO: simply don't render until chat exists
);
const getChatData = (state, chatId) => {
  const chat = selectChat(state, chatId);
  return {
    usersData: chat.userIds.map(id => ({
      id, ...chat.users[id],
    })),
  };
};
const mapStateToProps = (state, ownProps) => (
  getChatData(state, ownProps.chatId)
);
const UserList = connect(mapStateToProps)(UserListComponent);

export default UserList;

UserListComponent.propTypes = {
  usersData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
