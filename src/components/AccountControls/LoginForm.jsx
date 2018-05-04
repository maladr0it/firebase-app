import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, createUser } from '../../actions';
import InputForm from '../InputForm';

const LoginFormComponent = ({ onLogin, onCreateUser }) => (
  <React.Fragment>
    <InputForm label="USERNAME: " handleSubmit={value => onLogin(value)} autoFocus />
    <InputForm label="NEW USER: " handleSubmit={value => onCreateUser(value)} />
  </React.Fragment>
);
const mapDispatchToProps = {
  onLogin: login,
  onCreateUser: createUser,
};
const LoginForm = connect(null, mapDispatchToProps)(LoginFormComponent);

export default LoginForm;

LoginFormComponent.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onCreateUser: PropTypes.func.isRequired,
};
