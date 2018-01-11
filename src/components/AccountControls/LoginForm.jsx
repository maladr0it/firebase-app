import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  login,
} from '../../actions';
import InputForm from '../InputForm';

const LoginFormComponent = ({ onLogin }) => (
  <React.Fragment>
    <InputForm
      label="USERNAME: "
      handleSubmit={value => onLogin(value)}
    />
  </React.Fragment>
);
const mapDispatchToProps = {
  onLogin: login,
};
const LoginForm = connect(
  null,
  mapDispatchToProps,
)(LoginFormComponent);

export default LoginForm;

LoginFormComponent.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
