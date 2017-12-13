import React from 'react';

import MessageListContainer from '../containers/MessageListContainer';
import MessageInputContainer from '../containers/MessageInputContainer';

// add form to add a user by ID

const ChatWindow = ({ chatId, userIds, onAddUser }) => {
  const users = userIds.map(id => <li key={id}>{id}</li>);
  let input;
  const addUserForm = (
    <form
      onSubmit={e => {
        e.preventDefault();
        onAddUser(chatId, input.value);
        input.value = '';
      }}
    >
      <input
        defaultValue=''
        ref={node => {
          input = node;
        }}
      />
      <button type='submit'>
        ADD USER
      </button>
    </form>
  );

  return (
    <div>
      <div>CHATID: {chatId}</div>
      {addUserForm}
      <ul>{users}</ul>
      <MessageListContainer />
      <MessageInputContainer />
    </div>
  );
};

export default ChatWindow;