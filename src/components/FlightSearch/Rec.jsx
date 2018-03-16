import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSelectedFlightGroups } from '../../reducers/flightSearchViews';
import { getRecommendation } from '../../reducers/flightSearchResults';
import FlightGroup from './FlightGroup';

import './index.css';

// a concise render of a recommendation
const RecComponent = ({
  searchId, selectedDeparture, selectedReturn,
  price,
}) => {
  console.log(selectedDeparture);
  return (
    <div className="Rec">
      PRICE: {price}
      <div className="ArriveDepartPanes">
        <div className="LeftPane">
          <FlightGroup
            type="departure"
            searchId={searchId}
            id={selectedDeparture}
          />
        </div>
        <div className="RightPane">
          <FlightGroup
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
const Rec = connect(
  mapStateToProps,
  null,
)(RecComponent);
export default Rec;

RecComponent.propTypes = {
  searchId: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  selectedDeparture: PropTypes.string,
  selectedReturn: PropTypes.string,
};
RecComponent.defaultProps = {
  selectedDeparture: '',
  selectedReturn: '',
};
