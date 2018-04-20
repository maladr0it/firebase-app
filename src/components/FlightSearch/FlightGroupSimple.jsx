import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const FlightGroupSimple = ({
  flightGroup,
}) => {
  const departAt = flightGroup[0] &&
    moment(flightGroup[0].departDateTime);
  const arriveAt = flightGroup[flightGroup.length - 1] &&
    moment(flightGroup[flightGroup.length - 1].arriveDateTime);

  const flights = flightGroup.map((flight, i) => (
    <div key={i}>
      {flight.flightNo}
    </div>
  ));
  // add the departing locations for all flights,
  // as well as the arriving location for the last flight
  const stops = flightGroup.map((flight, i) => (
    <div key={i}>
      {flight.layover && <div>{flight.layover}</div>}
      <div>{flight.departAirportCode}</div>
    </div>
  )).concat([
    <div key={flightGroup.length}>
      {flightGroup[flightGroup.length - 1].arriveAirportCode}
    </div>,
  ]);
  return (
    <div className="FlightGroup">
      <div>
        <h3>{departAt.format('hh:mm')}</h3>
        <p>{departAt.format('ddd, MMM D')}</p>
      </div>
      <div className="FlightInfo">
        {/* insert non-breaking spaces as a dummy to
        correctly align flights and stops */}
        <div className="Flights">&nbsp;{flights}&nbsp;</div>
        <div className="Stops">{stops}</div>
      </div>
      <div>
        <h3>{arriveAt.format('hh:mm')}</h3>
        <p>{arriveAt.format('ddd, MMM D')}</p>
      </div>
    </div>
  );
};
export default FlightGroupSimple;

FlightGroupSimple.propTypes = {
  flightGroup: PropTypes.arrayOf(PropTypes.object).isRequired,
};
