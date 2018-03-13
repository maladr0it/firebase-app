import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import FlightItem from './FlightItem';

import { getFlightGroup } from '../../reducers/flightSearchResults';

const FlightGroupComponent = ({
  flights, isSelected,
  handleSelect,
}) => (
  // surrounding div to apply colors
  <div
    role="button"
    className={`FlightGroup ${(isSelected) ? 'Selected' : ''}`}
    onClick={() => handleSelect()} 
  >
    {flights.map(flight => (
      <FlightItem key={flight.flightNo} {...flight} />
    ))}
  </div>
);
const mapStateToProps = (state, ownProps) => ({
  flights: getFlightGroup(
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
  flights: PropTypes.arrayOf(Object).isRequired,
  isSelected: PropTypes.bool.isRequired,
  handleSelect: PropTypes.func.isRequired,
};
