import React from 'react';

const MessageList = ({ messages }) => {
  console.log(messages);
  return (
    <ul>
      {messages.map((message, i) => (
        <li key={i}>{message.text} :{message.isPending ? 'SENDING...' : 'SENT'}</li>
      ))}
    </ul>
  );
};

export default MessageList;
