import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import Chip from 'material-ui/Chip';

import {
  addUserToChat,
  removeUserFromChat,
} from '../../actions';
import { getUsers } from '../../reducers/chats';

import InputForm from '../InputForm';

const UserListComponent = ({
  onAddUser, onRemoveUser, chatId, users,
}) => {
  const userChips = users.map(userData => (
    <Chip
      key={userData.id}
      onRequestDelete={() => onRemoveUser(chatId, userData.id)}
    >
      {userData.id}
    </Chip>
  ));
  const addForm = (
    <IconMenu
      iconButtonElement={<Chip>+</Chip>}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    >
      <InputForm
        label="ADD USER: "
        handleSubmit={tagName => onAddUser(chatId, tagName)}
      />
    </IconMenu>
  );
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {userChips}
        {addForm}
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  users: getUsers(state.chats, ownProps.chatId),
});
const mapDispatchToProps = ({
  onAddUser: addUserToChat,
  onRemoveUser: removeUserFromChat,
});
const UserList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserListComponent);

export default UserList;

UserListComponent.propTypes = {
  chatId: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
  onAddUser: PropTypes.func.isRequired,
  onRemoveUser: PropTypes.func.isRequired,
};
UserListComponent.defaultProps = {
  users: [],
};
