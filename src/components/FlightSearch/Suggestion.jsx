import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

import FlightGroup from './FlightGroup';


// make this expandable to see more detail
// add button to remove suggestion
// recId is in props here, use it to get price etc
const Suggestion = ({
  searchId, departingId, returningId, oneWay,
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
      {(!oneWay) &&
      <FlightGroup
        type="return"
        searchId={searchId}
        id={returningId}
      />
      }
    </div>
  </div>
);
export default Suggestion;

Suggestion.propTypes = {
  searchId: PropTypes.string.isRequired,
  oneWay: PropTypes.bool.isRequired,
  departingId: PropTypes.string.isRequired,
  returningId: PropTypes.string.isRequired,
};
