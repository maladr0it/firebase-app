import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { login, createUser, loginWithGoogle } from '../../actions';
import InputForm from '../InputForm';

const LoginFormComponent = ({ onLogin, onCreateUser, onLoginWithGoogle }) => (
  <React.Fragment>
    <InputForm label="USERNAME: " autoFocus handleSubmit={value => onLogin(value)} />
    <InputForm label="NEW USER: " handleSubmit={value => onCreateUser(value)} />
    <RaisedButton label="Google sign-in" primary onClick={() => onLoginWithGoogle()} />
  </React.Fragment>
);
const mapDispatchToProps = {
  onLogin: login,
  onCreateUser: createUser,
  onLoginWithGoogle: loginWithGoogle,
};
const LoginForm = connect(null, mapDispatchToProps)(LoginFormComponent);

export default LoginForm;

LoginFormComponent.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onCreateUser: PropTypes.func.isRequired,
  onLoginWithGoogle: PropTypes.func.isRequired,
};
