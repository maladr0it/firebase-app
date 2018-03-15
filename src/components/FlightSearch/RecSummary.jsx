import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSelectedFlightGroups } from '../../reducers/flightSearchViews';
import { getRecommendation } from '../../reducers/flightSearchResults';
import FlightGroupSummary from './FlightGroupSummary';

import './index.css';

// a concise render of a recommendation
const RecSummaryComponent = ({
  searchId, selectedDeparture, selectedReturn,
  price,
}) => {
  console.log(selectedDeparture);
  return (
    <div className="RecSummary">
      PRICE: {price}
      <div className="ArriveDepartPanes">
        <div className="LeftPane">
          <FlightGroupSummary
            type="departure"
            searchId={searchId}
            id={selectedDeparture}
          />
        </div>
        <div className="RightPane">
          <FlightGroupSummary
            type="return"
            searchId={searchId}
            id={selectedReturn}
          />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  ...getRecommendation(
    state.flightSearchResults,
    ownProps.searchId,
    ownProps.recId,
  ),
  ...getSelectedFlightGroups(
    state.flightSearchViews,
    ownProps.searchId,
    ownProps.recId,
  ),
});
const RecSummary = connect(
  mapStateToProps,
  null,
)(RecSummaryComponent);
export default RecSummary;

RecSummaryComponent.propTypes = {
  searchId: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  selectedDeparture: PropTypes.string.isRequired,
  selectedReturn: PropTypes.string.isRequired,
};
