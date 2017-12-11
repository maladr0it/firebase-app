import React from 'react';

import MessageListContainer from '../containers/MessageListContainer';
import MessageInputContainer from '../containers/MessageInputContainer';

const ChatWindow = ({ chatId, userIds }) => {
  const users = userIds.map(id => id);
  return (
    <div>
      <div>CHATID: {chatId}</div>
      <div>USERS: {users}</div>
      <MessageListContainer />
      <MessageInputContainer />
    </div>
  );
};

export default ChatWindow;