/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getFlightGroup } from '../../reducers/flightSearchResults';

import './index.css';
// summary of flight for the list-view
// TODO: consider renderProps for FlightGroupSummary and FlightGroup
const FlightGroupComponent = ({ flightGroup }) => {
  if (!flightGroup) {
    return (
      <div>Please select a valid flight.</div>
    );
  }
  const departAt = flightGroup[0] &&
    moment(flightGroup[0].departDateTime);
  const arriveAt = flightGroup[flightGroup.length - 1] &&
    moment(flightGroup[flightGroup.length - 1].arriveDateTime);

  const flights = flightGroup.map((flight, i) => (
    <div key={i}>
      {flight.flightNo}
    </div>
  ));
  const stops = flightGroup.map(flight => flight.departAirportCode)
    .concat(flightGroup[flightGroup.length - 1].arriveAirportCode)
    .map((stop, i) => (
      <div key={i}>
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
    <div className="FlightGroup">
      <div className="Times">
        <div>
          <h3>{departAt.format('hh:mm')}</h3>
          <p>{departAt.format('ddd, MMM Do')}</p>
        </div>
        <div>
          <h3>{arriveAt.format('hh:mm')}</h3>
          <p>{arriveAt.format('ddd, MMM Do')}</p>
        </div>
      </div>
      <div className="Flights">{flights}</div>
      <div className="Layovers">{layovers}</div>
      <div className="Stops">{stops}</div>
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
