import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  removeUserFromChat,
} from '../../actions';

const UserListComponent = ({ removeUser, chatId, usersData }) => {
  const users = usersData.map(userData => (
    <button
      key={userData.id}
      onClick={() => removeUser(chatId, userData.id)}
    >
      {userData.id}
    </button>
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
const mapDispatchToProps = ({
  removeUser: removeUserFromChat,
});
const UserList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserListComponent);

export default UserList;

UserListComponent.propTypes = {
  chatId: PropTypes.string.isRequired,
  usersData: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeUser: PropTypes.func.isRequired,
};
