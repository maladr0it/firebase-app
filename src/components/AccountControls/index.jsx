import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import UserControls from './UserControls';

const AccountControls = props => (
  <div style={{ background: '#79ADDC' }}>
    {(props.isLoggedIn) ? <UserControls /> : <LoginForm />}
  </div>
);
export default AccountControls;

AccountControls.propTypes = {
  isLoggedIn: PropTypes.string,
};
AccountControls.defaultProps = {
  isLoggedIn: undefined,
};
