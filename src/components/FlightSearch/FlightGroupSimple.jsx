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
  const stops2 = flightGroup.map(flight => flight.departAirportCode)
    .concat(flightGroup[flightGroup.length - 1].arriveAirportCode)
    .map((stop, i) => (
      <div key={i}>
        {stop}
      </div>
    ));


  const stops = flightGroup.map((flight, i) => (
    <div>
      {flight.layover && <div>{flight.layover}</div>}
      <div>{flight.departAirportCode}</div>
    </div>
  )).concat(<div>LAST</div>);
  // how to generate:
  // <div>
  //  <div>layover</div>
  //  <div>stop_name</div>
  // </div>
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
      <div>
        <h3>{departAt.format('hh:mm')}</h3>
        <p>{departAt.format('ddd, MMM D')}</p>
      </div>
      <div className="FlightInfo">
        <div className="Flights">{flights}</div>
        {/* <div className="Layovers">{layovers}</div> */}
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
