import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import { getUser, getReadUsers } from '../../reducers/users';
import './index.css';

const MessageComponent = ({
  text, authorData, createdAt, readUsers, readStatus,
}) => {
  const timestamp = (createdAt) ? createdAt.toString() : 'sending...';
  const seenBy = readUsers.map(user => (
    <li key={user.id}>
      <Avatar src={user.avatarUrl} size={20} /> at {readStatus[user.id].toString()}
    </li>
  ));
  return (
    // <img src={authorData.avatarUrl || null} alt="avatar" />
    <div className="Message">
      <ListItem
        disabled
        leftAvatar={
          <Avatar src={authorData.avatarUrl} />
        }
        primaryText={`${authorData.username} says: ${text}`}
        secondaryText={
          <p>
            Sent: {timestamp}
          </p>
        }
      />
      <ul>
        {seenBy}
      </ul>
    </div>
  );
};
// this will get the readStatus and username for the component
const mapStateToProps = (state, ownProps) => ({
  authorData: getUser(state.users, ownProps.author),
  readUsers: getReadUsers(state.users, ownProps.readStatus),
});
const Message = connect(
  mapStateToProps,
  null,
)(MessageComponent);
export default Message;

const userShape = {
  username: PropTypes.string,
  avatarUrl: PropTypes.string,
};
MessageComponent.propTypes = {
  authorData: PropTypes.shape(userShape).isRequired,
  readUsers: PropTypes.arrayOf(PropTypes.shape(userShape)),
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date),
  readStatus: PropTypes.objectOf(Date),
};
MessageComponent.defaultProps = {
  createdAt: Date.now(),
  readStatus: {},
  readUsers: [],
};
