import React from 'react';
import { connect } from 'react-redux';
import {
  logout
} from '../../actions';

const AccountControlsComponent = ({ onLogout, userId }) => {
  return (
    <div>
      LOGGED IN AS: {userId}
      <button onClick={() => onLogout()}>
        LOG OUT
      </button>
    </div>
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