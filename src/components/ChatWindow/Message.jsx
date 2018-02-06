import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListItem } from 'material-ui/List';

import { getUser, getReadUsers } from '../../reducers/users';
import './index.css';

const MessageComponent = ({
  text, authorUsername, createdAt, readUsers, readStatus,
}) => {
  const timestamp = (createdAt) ? createdAt.toString() : 'sending...';
  const seenBy = readUsers.map(user => (
    <li key={user.id}>
      <b>{user.username}</b> read at {readStatus[user.id].toString()}
    </li>
  ));
  return (
    <div className="Message">
      <ListItem
        disabled
        primaryText={`${authorUsername} says: ${text}`}
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
const mapStateToProps = (state, ownProps) => {
  // get authorId, readStatusIds
  // get the user obj for each of these
  const author = getUser(state.users, [ownProps.author]);
  return {
    authorUsername: author.username,
    readUsers: getReadUsers(state.users, ownProps.readStatus),
  };
};
const Message = connect(
  mapStateToProps,
  null,
)(MessageComponent);
export default Message;

MessageComponent.propTypes = {
  authorUsername: PropTypes.string.isRequired,
  readUsers: PropTypes.arrayOf(PropTypes.object),

  text: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date),
  readStatus: PropTypes.objectOf(Date),
};
MessageComponent.defaultProps = {
  createdAt: Date.now(),
  readStatus: {},
  readUsers: [],
};
