import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  addUserToChat,
  removeUserFromChat,
} from '../../actions';
import { getUsers } from '../../reducers/chats';

import InputForm from '../InputForm';

const UserListComponent = ({
  addUser, removeUser, chatId, users,
}) => {
  const userButtons = users.map(userData => (
    <button
      key={userData.id}
      onClick={() => removeUser(chatId, userData.id)}
    >
      {userData.id}
    </button>
  ));
  return (
    <div>
      <InputForm
        label="ADD USER: "
        handleSubmit={userId => addUser(chatId, userId)}
      />
      USERS: {userButtons}
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  users: getUsers(state.chats, ownProps.chatId),
});
const mapDispatchToProps = ({
  addUser: addUserToChat,
  removeUser: removeUserFromChat,
});
const UserList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserListComponent);

export default UserList;

UserListComponent.propTypes = {
  chatId: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
  addUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
};
UserListComponent.defaultProps = {
  users: [],
};
