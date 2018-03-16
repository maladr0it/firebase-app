import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFlightGroup } from '../../reducers/flightSearchResults';

// make this a dumb component

import './index.css';
// summary of flight for the list-view
// TODO: consider renderProps for FlightGroupSummary and FlightGroup
const FlightGroupComponent = ({ flightGroup }) => {
  // logic here to summarise
  if (!flightGroup) {
    return (
      <div>Please select a valid flight.</div>
    );
  }
  const departAt = flightGroup[0] && flightGroup[0].departDateTime;
  const arriveAt = flightGroup[flightGroup.length - 1].arriveDateTime;

  const flights = flightGroup.map(flight => (
    <div key={flight.flightNo}>
      {flight.flightNo}
    </div>
  ));
  const stops = flightGroup.map(flight => flight.departAirportCode)
    .concat(flightGroup[flightGroup.length - 1].arriveAirportCode)
    .map(stop => (
      <div key={stop}>
        {stop}
      </div>
    ));
  const layovers = flightGroup.reduce((acc, flight) => {
    if (flight.layover) {
      acc.push(flight.layover);
    }
    return acc;
  }, []).map((layover, i) => (
    <div key={i}>{layover}</div>
  ));

  return (
    <div className="FlightGroupSummary">
      <p>LEAVE: {departAt} ARRIVE: {arriveAt}</p>
      <div className="Flights">{flights}</div>
      <div className="Stops">{stops}</div>
      <div className="Layovers">{layovers}</div>
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
const FlightGroup = connect(
  mapStateToProps,
  null,
)(FlightGroupComponent);
export default FlightGroup;

FlightGroupComponent.propTypes = {
  flightGroup: PropTypes.arrayOf(PropTypes.object),
};
FlightGroupComponent.defaultProps = {
  flightGroup: null,
};
