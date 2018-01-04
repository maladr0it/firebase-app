import React from 'react';
import PropTypes from 'prop-types';

import { ListItem } from 'material-ui/List';
import { darkBlack } from 'material-ui/styles/colors';
import './index.css';

const MessageComponent = ({
  text, author, isPending, createdAt,
}) => {
  const timestamp = (!isPending) ? createdAt.toString() : 'sending...';
  return (
    <ListItem
      className="Message"
      primaryText={text}
      secondaryText={
        <p>
          <span style={{ color: darkBlack }}>{author}</span> -- {timestamp}
        </p>
      }
    />
  );
};
export default MessageComponent;

MessageComponent.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isPending: PropTypes.bool.isRequired,
  createdAt: PropTypes.instanceOf(Date),
};
MessageComponent.defaultProps = {
  createdAt: Date.now(),
};
