import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  logout,
} from '../../actions';

const UserControlsComponent = ({ onLogout, username }) => (
  <React.Fragment>
    <span>LOGGED IN AS: {username} </span>
    <button onClick={() => onLogout()}>
      LOG OUT
    </button>
  </React.Fragment>
);
const mapStateToProps = state => ({
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
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};
