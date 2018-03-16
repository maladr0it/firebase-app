/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Selectable = ({
  handleSelect, isSelected, isInvalid, children,
}) => (
  <div
    className={`${isSelected ? 'Selected' : ''} ${isInvalid ? 'Invalid' : ''}`}
    onClick={() => handleSelect()}
  >
    {children}
  </div>
);
export default Selectable;

Selectable.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isInvalid: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
Selectable.defaultProps = {
  isInvalid: false,
};
