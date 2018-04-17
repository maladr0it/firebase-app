/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFlightGroup } from '../../reducers/flightSearchResults';

import FlightGroupDetail from './FlightGroupDetail';
import FlightGroupSimple from './FlightGroupSimple';

import './index.css';

// summary of flight for the list-view
// TODO: consider renderProps for FlightGroupSummary and FlightGroup
const FlightGroupComponent = ({
  flightGroup,
  baggageAllowance,
  detail,
}) => {
  if (!flightGroup) {
    return (
      <div className="FlightGroup">
        Please select a valid flight.
      </div>
    );
  }
  if (!detail) {
    return (
      <FlightGroupSimple
        flightGroup={flightGroup}
      />
    );
  }
  return (
    <FlightGroupDetail
      flightGroup={flightGroup}
      baggageAllowance={baggageAllowance}
    />
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
  baggageAllowance: PropTypes.string,
  detail: PropTypes.bool,
};
FlightGroupComponent.defaultProps = {
  flightGroup: null,
  baggageAllowance: '',
  detail: false,
};
