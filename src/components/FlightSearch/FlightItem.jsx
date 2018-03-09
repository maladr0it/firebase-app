import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const formatDuration = (duration) => {
  const hours = duration.get('hours') ?
    `${duration.get('hours')}h` : '';
  const minutes = duration.get('minutes') ?
    ` ${duration.get('minutes')}m` : '';
  return hours + minutes;
};

const FlightItemComponent = (props) => {
  const layover = (props.layover)
    && <div>--- Layover: {formatDuration(props.layover)} ---</div>;
  return (
    <div className="FlightItem">
      {layover}
      <p>{props.airlineName} {props.flightNo}</p>
      <div className="ArriveDepartPanes">
        <div className="LeftPane">
          <p>{props.departAirportCode} {props.departDateTime.format('HH:mm')}</p>
          <p>{props.departDateTime.format('ddd, D MMM')}</p>
          <p>Terminal {props.departTerminal}, {props.departAirport}, {props.departLocation}
          </p>
        </div>
        <div className="Duration">
          <p>{formatDuration(props.duration)}</p>
        </div>
        <div className="RightPane">
          <p>{props.arriveAirportCode} {props.arriveDateTime.format('HH:mm')}</p>
          <p>{props.arriveDateTime.format('ddd, D MMM')}</p>
          <p>Terminal {props.arriveTerminal}, {props.arriveAirport}, {props.arriveLocation}
          </p>
        </div>
      </div>
    </div>
  );
};
export default FlightItemComponent;

FlightItemComponent.propTypes = {
  airlineName: PropTypes.string,
  flightNo: PropTypes.string.isRequired,
  departAirportCode: PropTypes.string.isRequired,
  departTerminal: PropTypes.string.isRequired,
  departAirport: PropTypes.string,
  departLocation: PropTypes.string,
  departDateTime: PropTypes.string.isRequired,
  arriveAirportCode: PropTypes.string.isRequired,
  arriveTerminal: PropTypes.string.isRequired,
  arriveAirport: PropTypes.string,
  arriveLocation: PropTypes.string,
  arriveDateTime: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  layover: PropTypes.string,

};
FlightItemComponent.defaultProps = {
  airlineName: 'AIRLINE_NAME',
  layover: undefined,
  departAirport: 'DEPART_AIRPORT',
  departLocation: 'DEPART_LOCATION',
  arriveAirport: 'ARRIVE_AIRPORT',
  arriveLocation: 'ARRIVE_LOCATION',
};
