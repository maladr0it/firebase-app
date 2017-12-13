import React from 'react';

const LoginForm = ({ userId, onLogin }) => {
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
        defaultValue='1jjahsBIp6Z8DkXKCmZa'
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
    <div>
      {form}
      LOGGED IN AS: {userId}
    </div>
  );
};

export default LoginForm;
