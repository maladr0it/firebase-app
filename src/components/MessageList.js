import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <ul>
      {messages.map((message, i) => (
        <li key={i}>
          <div>{message.author} says: </div>
          <div><b>{message.text}</b></div>
          <div>
            {!message.isPending ? message.createdAt.toString() : "sending..."}
          </div>
          <br />
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
