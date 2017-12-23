import React from 'react';

import './index.css';

const MessageComponent = ({ author, text, isPending, createdAt }) => {
  const timestamp = (!isPending) ? createdAt.toString() : 'sending...'
  return (
    <li className='Message'>
      {author} says: <br />
      <b>{text}</b> <br />
      {timestamp} <br />
    </li>
  );
};
export default MessageComponent;