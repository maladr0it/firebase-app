import React from 'react';

const MessageInputForm = ({ onSend, userId, chatId }) => {
  let input; // ref to input box
  
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSend(chatId, userId, input.value);
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