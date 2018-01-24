import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  logout,
} from '../../actions';

const UserControlsComponent = ({
  onLogout, username, userId,
}) => (
  <React.Fragment>
    <span>LOGGED IN AS: {username} ID: {userId}</span>
    <button onClick={() => onLogout()}>
      LOG OUT
    </button>
  </React.Fragment>
);
const mapStateToProps = state => ({
  userId: state.user.userId,
  username: state.user.username,
});
const mapDispatchToProps = {
  onLogout: logout,
};
const UserControls = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserControlsComponent);
export default UserControls;

UserControlsComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};
