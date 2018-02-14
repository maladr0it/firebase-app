import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../../reducers/users';

import UserProfile from './UserProfile';

import './index.css';

const UserPaneComponent = ({
  userId, userData,
}) => (
  <div className="UserPane">
    {(userId) ? (
      <UserProfile userId={userId} {...userData} />
    ) : (
      ''
    )}
  </div>
);
const mapStateToProps = state => ({
  userId: state.chatApp.selectedUser,
  userData: getUser(state.users, state.chatApp.selectedUser),
});
const UserPane = connect(
  mapStateToProps,
  null,
)(UserPaneComponent);
export default UserPane;

const userShape = {
  username: PropTypes.string,
  avatarUrl: PropTypes.string,
  joinedAt: PropTypes.instanceOf(Date),
};
UserPaneComponent.propTypes = {
  userData: PropTypes.shape(userShape).isRequired,
  userId: PropTypes.string,
};
UserPaneComponent.defaultProps = {
  userId: '',
};
