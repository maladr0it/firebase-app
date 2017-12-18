import React from 'react';
import { connect } from 'react-redux';
import {
  login
} from '../../actions';

const LoginFormComponent = ({ userId, onLogin }) => {
  let input;
  const form = (
    <form
      onSubmit={e => {
        e.preventDefault();
        onLogin(input.value);
        input.value = '';
      }}
    >
      <input
        defaultValue='loki'
        ref={node => {
          input = node;
        }}
      />
      <button type='submit'>
        LOGIN
      </button>
    </form>
  );

  return (
    <div style={{background: '#79ADDC'}}>
      {form}
      LOGGED IN AS: {userId}
    </div>
  );
};


const mapStateToProps = state => ({
  userId: state.user.userId
});

const mapDispatchToProps = dispatch => ({
  onLogin: userId => {
    dispatch(login(userId));
  }
});

const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent)

export default LoginForm;
