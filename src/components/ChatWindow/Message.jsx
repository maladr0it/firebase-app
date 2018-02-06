import React from 'react';
import PropTypes from 'prop-types';

import { ListItem } from 'material-ui/List';
import './index.css';

const MessageComponent = ({
  text, author, createdAt, readStatus,
}) => {
  const timestamp = (createdAt) ? createdAt.toString() : 'sending...';
  const seenBy = Object.keys(readStatus).filter(id => readStatus[id] !== null)
    .map(id => (
      <li key={id}><b>{id}</b> read at {readStatus[id].toString()}</li>
    ));
  return (
    <div className="Message">
      <ListItem
        disabled
        primaryText={`${author} says: ${text}`}
        secondaryText={
          <p>
            Sent: {timestamp}
          </p>
        }
      />
      <ul>
        {seenBy}
      </ul>
    </div>
  );
};
export default MessageComponent;

MessageComponent.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date),
  readStatus: PropTypes.objectOf(Date),
};
MessageComponent.defaultProps = {
  createdAt: Date.now(),
  readStatus: {},
};
