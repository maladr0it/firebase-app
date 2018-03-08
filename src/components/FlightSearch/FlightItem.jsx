import React from 'react';
import moment from 'moment';
import Paper from 'material-ui/Paper';

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
          <p>Terminal {props.departTerminal},
            {props.departAirport},
            {props.departLocation}
          </p>
        </div>
        <div className="Duration">
          <p>{formatDuration(props.duration)}</p>
        </div>
        <div className="RightPane">
          <p>{props.arriveAirportCode} {props.arriveDateTime.format('HH:mm')}</p>
          <p>{props.arriveDateTime.format('ddd, D MMM')}</p>
          <p>Terminal {props.arriveTerminal},
            {props.arriveAirport},
            {props.arriveLocation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightItemComponent;
// const airlineName = 'American Airlines';
// const flightNo = 'AA 9907';

// const departDateTime = moment('2018-03-15 01:55');
// const arriveDateTime = moment('2018-03-15 17:55');
// const duration = moment.duration(arriveDateTime.diff(departDateTime));

// const departAirportCode = 'AUH';
// const departTerminal = '3';
// const departAirport = 'Abu Dhabi International Airport';
// const departLocation = 'Dubai';
// const arriveAirportCode = 'LAX';
// const arriveTerminal = 'A';
// const arriveAirport = 'Los Angeles';
// const arriveLocation = 'Los Angeles';


// return (
//   <Paper className="FlightItem">
//     <p className="FlightName">{airlineName} {flightNo}</p>
//     <div className="ArriveDepartPanes">
//       <div className="LeftPane">
//         <p>{departAirportCode} {departDateTime.format('HH:mm')}</p>
//         <p>{departDateTime.format('ddd, D MMM')}</p>
//         <p>Terminal {departTerminal}, {departAirport}, {departLocation}</p>
//       </div>
//       <div className="Duration">
//         <p>{formatDuration(duration)}</p>
//       </div>
//       <div className="RightPane">
//         <p>{arriveAirportCode} {arriveDateTime.format('HH:mm')}</p>
//         <p>{arriveDateTime.format('ddd, D MMM')}</p>
//         <p>Terminal {arriveTerminal}, {arriveAirport}, {arriveLocation}</p>
//       </div>
//     </div>
//   </Paper>
// );
