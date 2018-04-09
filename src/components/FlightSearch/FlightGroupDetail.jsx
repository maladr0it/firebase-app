import React from 'react';
import PropTypes from 'prop-types';
import FlightItem from './FlightItem';

import './index.css';

const FlightGroupDetail = ({
  flightGroup, baggageAllowance,
}) => (
  <div className="FlightGroupDetail">
    BAGGAGE ALLOWANCE: {baggageAllowance || 'unknown'}
    {flightGroup.map((flight, i) => (
      <FlightItem key={i} {...flight} />
    ))}
  </div>
);
export default FlightGroupDetail;

FlightGroupDetail.propTypes = {
  flightGroup: PropTypes.arrayOf(PropTypes.object),
  baggageAllowance: PropTypes.string,
};
FlightGroupDetail.defaultProps = {
  flightGroup: null,
  baggageAllowance: '',
};
