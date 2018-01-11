import React from 'react';
import PropTypes from 'prop-types';

import { ListItem } from 'material-ui/List';
import { darkBlack } from 'material-ui/styles/colors';
import './index.css';

const TypingIndicatorComponent = ({ author }) => (
  <div className="TypingIndicator">
    <ListItem
      disabled={true}
      primaryText="..."
      secondaryText={
        <p>
          <span style={{ color: darkBlack }}>{author}</span>
        </p>
      }
    />
  </div>
);
export default TypingIndicatorComponent;

TypingIndicatorComponent.propTypes = {
  author: PropTypes.string.isRequired,
};
