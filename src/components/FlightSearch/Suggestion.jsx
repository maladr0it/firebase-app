import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

import FlightGroup from './FlightGroup';

// recId is in props here, use it to get price etc
const SuggestionComponent = ({
  searchId, departingId, returningId,
}) => (
  <div className="DepartReturnPanes">
    <div className="LeftPane">
      <FlightGroup
        type="departure"
        searchId={searchId}
        id={departingId}
      />
    </div>
    <div className="RightPane">
      <FlightGroup
        type="return"
        searchId={searchId}
        id={returningId}
      />
    </div>
  </div>
);
export default SuggestionComponent;

SuggestionComponent.propTypes = {
  searchId: PropTypes.string.isRequired,
  departingId: PropTypes.string.isRequired,
  returningId: PropTypes.string.isRequired,
};
