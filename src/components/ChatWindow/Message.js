import React from 'react';

import { ListItem } from 'material-ui/List';
import { darkBlack } from 'material-ui/styles/colors';
import './index.css';

const MessageComponent = ({ author, text, isPending, createdAt }) => {
  const timestamp = (!isPending) ? createdAt.toString() : 'sending...'
  return (
    <ListItem
      className='Message'
      primaryText={text}
      secondaryText={
        <p>
          <span style={{color: darkBlack}}>{author}</span> -- {timestamp}
        </p>
      }
    />
  );
};
export default MessageComponent;