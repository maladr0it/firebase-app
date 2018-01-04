import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const UserListComponent = ({ userIds }) => {
  return (
    <div>
      USERS: {userIds.map(id => <span key={id}>{id} </span>)}
    </div>
  );
};

const selectChat = (state, chatId) => (
  state.chats[chatId] || { userIds: [] }
  // TODO: simply don't render until chat exists
);
const getUserIds = (state, chatId) => {
  const chat = selectChat(state, chatId);
  const { userIds } = chat;
  return userIds;
};
const mapStateToProps = (state, ownProps) => ({
  userIds: getUserIds(state, ownProps.chatId),
});
const UserList = connect(mapStateToProps)(UserListComponent);
export default UserList;

UserListComponent.propTypes = {
  userIds: PropTypes.arrayOf(PropTypes.string),
};
UserListComponent.defaultProps = {
  userIds: [],
};
