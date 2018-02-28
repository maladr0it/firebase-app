import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import { getJoinedUserIds } from '../../reducers/chats';
import { getUsers } from '../../reducers/users';

import './index.css';

const ChatItemComponent = ({
  handleSelectChat,
  chatId, users, isSelected,
}) => {
  const selectedStatus = (isSelected) ? 'Selected' : '';
  const userList = users.map(user => (
    <span key={user.id}>{user.username} </span>
  ));
  return (
    // HAX: List within a containing div to override MUI's backgroundColor
    <div className={`${selectedStatus}`}>
      <ListItem
        primaryText={userList}
        secondaryText={<p>{chatId}</p>}
        onClick={() => handleSelectChat()}
      />
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  const userIds = getJoinedUserIds(state.chats, ownProps.chatId);
  return {
    userId: state.user.userId,
    users: getUsers(state.users, userIds),
  };
};
const ChatItem = connect(
  mapStateToProps,
  null,
)(ChatItemComponent);
export default ChatItem;

ChatItemComponent.propTypes = {
  chatId: PropTypes.string.isRequired,
  handleSelectChat: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
};
ChatItemComponent.defaultProps = {
  users: [],
};
