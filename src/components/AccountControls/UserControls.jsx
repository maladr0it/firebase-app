import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions';

const UserControlsComponent = ({ onLogout, displayName, userId }) => (
  <React.Fragment>
    <span>
      LOGGED IN AS: {displayName} ID: {userId}
    </span>
    <button onClick={() => onLogout()}>LOG OUT</button>
  </React.Fragment>
);
const mapStateToProps = state => ({
  userId: state.user.userId,
  displayName: state.user.displayName,
});
const mapDispatchToProps = {
  onLogout: logout,
};
const UserControls = connect(mapStateToProps, mapDispatchToProps)(UserControlsComponent);
export default UserControls;

UserControlsComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};
