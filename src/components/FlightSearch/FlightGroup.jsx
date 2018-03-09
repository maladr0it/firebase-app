import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import FlightItem from './FlightItem';

const FlightGroupComponent = (props) => {
  return (
    <Paper className="FlightGroup">
      <p>{props.origin} - {props.destination}</p>
      {props.flights.map(flight => (
        <FlightItem key={flight.flightNo} {...flight} />
      ))}
    </Paper>
  );
};
export default FlightGroupComponent;

FlightGroupComponent.propTypes = {
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  flights: PropTypes.arrayOf(Object).isRequired,
};
