import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import UserControls from './UserControls';

import './index.css';

const AccountControls = props => (
  <div className="AccountControls">
    {(props.isLoggedIn) ? <UserControls /> : <LoginForm />}
  </div>
);
export default AccountControls;

AccountControls.propTypes = {
  isLoggedIn: PropTypes.bool,
};
AccountControls.defaultProps = {
  isLoggedIn: false,
};
