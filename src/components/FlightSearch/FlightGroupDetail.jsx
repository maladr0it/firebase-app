/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlightItem from './FlightItem';
import { getFlightGroup } from '../../reducers/flightSearchResults';

const FlightGroupComponent = ({
  flightGroup, isSelected, isInvalid,
  handleSelect,
}) => (
  <div
    className={`FlightGroup ${isSelected ? ' Selected' : ''} ${isInvalid ? ' Invalid' : ' '}`}
    onClick={() => handleSelect()}
  >
    {flightGroup.map(flight => (
      <FlightItem key={flight.flightNo} {...flight} />
    ))}
  </div>
);
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
  flightGroup: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSelected: PropTypes.bool.isRequired,
  isInvalid: PropTypes.bool.isRequired,
  handleSelect: PropTypes.func.isRequired,
};
