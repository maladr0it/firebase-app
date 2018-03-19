import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlightItem from './FlightItem';
import { getFlightGroup } from '../../reducers/flightSearchResults';

const FlightGroupComponent = ({
  flightGroup,
}) => {
  if (!flightGroup) {
    return (
      <div>Please select a valid flight.</div>
    );
  }
  return (
    <div className="FlightGroup">
      {flightGroup.map((flight, i) => (
        <FlightItem key={i} {...flight} />
      ))}
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
