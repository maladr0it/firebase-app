import React from 'react';
import LoginForm from './LoginForm';
import AccountControls from './AccountControls';

export default (props) => (
  <div style={{background: '#79ADDC'}}>
    {(props.isLoggedIn) ? <AccountControls /> : <LoginForm />}
  </div>
);