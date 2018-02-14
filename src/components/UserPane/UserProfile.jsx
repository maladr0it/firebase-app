import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'material-ui/Avatar';

const UserProfileComponent = ({
  userId, username, avatarUrl,
}) => (
  <div>
    <Avatar src={avatarUrl} />
    <p>{username}</p>
    <p>id is: {userId}</p>
  </div>
);
export default UserProfileComponent;

UserProfileComponent.propTypes = {
  userId: PropTypes.string,
  username: PropTypes.string,
  avatarUrl: PropTypes.string,
};
UserProfileComponent.defaultProps = {
  userId: '...',
  username: '...',
  avatarUrl: '',
};
