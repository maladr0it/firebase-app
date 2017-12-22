import React from 'react';
import { connect } from 'react-redux';
import {
  logout
} from '../../actions';

const AccountControlsComponent = ({ onLogout, userId }) => {
  return (
    <React.Fragment>
      <span>LOGGED IN AS: {userId} </span>
      <button onClick={() => onLogout()}>
        LOG OUT
      </button>
    </React.Fragment>
  );
};
const mapStateToProps = state => ({
  userId: state.user.userId
});
const mapDispatchToProps = {
  onLogout: logout
};
const AccountControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountControlsComponent);

export default AccountControls;