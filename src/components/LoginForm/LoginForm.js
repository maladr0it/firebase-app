import React from 'react';
import { connect } from 'react-redux';
import {
  login
} from '../../actions';
import InputForm from '../InputForm';

const LoginFormComponent = ({ onLogin, userId }) => {
  return (
    <div style={{background: '#79ADDC'}}>
      <InputForm
        label='USERNAME: '
        handleSubmit={value => onLogin(value)}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  userId: state.user.userId
});

const mapDispatchToProps = {
  onLogin: login,
};

const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);

export default LoginForm;
