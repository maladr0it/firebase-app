import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import {
  addUserToChat,
  removeUserFromChat,
} from '../../actions';
import { getUserIds } from '../../reducers/chats';

import InputForm from '../InputForm';

const UserListComponent = ({
  onAddUser, onRemoveUser, chatId, userIds,
}) => {
  const userChips = userIds.map(id => (
    <Chip
      key={id}
      onRequestDelete={() => onRemoveUser(chatId, id)}
    >
      {id}
    </Chip>
  ));
  const addForm = (
    <IconMenu
      iconButtonElement={<IconButton><AddIcon /></IconButton>}
      anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
      targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
    >
      <InputForm
        label="ADD USER: "
        handleSubmit={tagName => onAddUser(chatId, tagName)}
        autoFocus
      />
    </IconMenu>
  );
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {userChips}
        {addForm}
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  userIds: getUserIds(state.chats, ownProps.chatId),
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
  userIds: PropTypes.arrayOf(PropTypes.string),
  onAddUser: PropTypes.func.isRequired,
  onRemoveUser: PropTypes.func.isRequired,
};
UserListComponent.defaultProps = {
  userIds: [],
};
