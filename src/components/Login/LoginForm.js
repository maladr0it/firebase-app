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
    <div>
      {form}
      LOGGED IN AS: {userId}
    </div>
  );
};

export default LoginForm;
