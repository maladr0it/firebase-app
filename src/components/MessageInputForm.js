import React from 'react';

const MessageInputForm = ({ onSend }) => {
  let input; // ref to input box
  
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSend(input.value);
        input.value = '';
      }}
    >
      <input
        ref={node => {
          input = node;
        }}
      />
      <button type='submit'>
        SEND
      </button>
    </form>
  );
};

export default MessageInputForm;