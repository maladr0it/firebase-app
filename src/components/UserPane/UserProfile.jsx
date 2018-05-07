import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import { getUser } from '../../reducers/users';

const UserProfileComponent = ({ userId, displayName, avatarUrl }) => (
  <div>
    <Avatar src={avatarUrl} />
    <p>{displayName}</p>
    <p>id is: {userId}</p>
  </div>
);
const mapStateToProps = (state, ownProps) => ({
  ...getUser(state.users, ownProps.userId),
});
const UserProfile = connect(mapStateToProps, null)(UserProfileComponent);
export default UserProfile;

UserProfileComponent.propTypes = {
  userId: PropTypes.string,
  displayName: PropTypes.string,
  avatarUrl: PropTypes.string,
};
UserProfileComponent.defaultProps = {
  userId: '...',
  displayName: '...',
  avatarUrl: '',
};
