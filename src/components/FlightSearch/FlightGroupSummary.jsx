import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFlightGroup } from '../../reducers/flightSearchResults'; 

// summary of flight for the list-view
// TODO: consider renderProps for FlightGroupSummary and FlightGroup
const FlightGroupSummaryComponent = ({ flightGroup }) => {
  // logic here to summarise
  // get total flight time (durations plus layovers)
  const flights = flightGroup.map(flight => (
    <div key={flight.flightNo}>

      <p>{flight.flightNo}</p>

    </div>
  ));
  return (
    <div>
      {flights}
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  flightGroup: getFlightGroup(
    state.flightSearchResults,
    ownProps.searchId,
    ownProps.type,
    ownProps.id,
  ),
});
const FlightGroupSummary = connect(
  mapStateToProps,
  null,
)(FlightGroupSummaryComponent);
export default FlightGroupSummary;

FlightGroupSummaryComponent.propTypes = {
  flightGroup: PropTypes.arrayOf(PropTypes.object).isRequired,
};
