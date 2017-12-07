import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <ul>
      {messages.map((message, i) => (
        <li key={i}>{message.text}{message.isPending ? 'PENDING' : 'LIVE'}</li>
      ))}
    </ul>
  );
};

export default MessageList;
