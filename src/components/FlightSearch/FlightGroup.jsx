import React from 'react';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import FlightItem from './FlightItem';

const FlightGroupComponent = () => {
  const origin = 'Dubai';
  const destination = 'San Francisco';

  const flights = [
    {
      airlineName: 'Cathay Pacific',
      flightNo: 'CX 746',
      departAirportCode: 'DBX',
      departTerminal: '3',
      departAirport: 'Abu Dhabi International Airport',
      departLocation: 'Dubai',
      arriveAirportCode: 'HKG',
      arriveTerminal: '1',
      arriveAirport: 'Hong Kong',
      arriveLocation: 'Hong Kong',
      departDateTime: moment('2018-03-24 17:55').utcOffset(4),
      arriveDateTime: moment('2018-03-25 05:00').utcOffset(8),
      duration: moment.duration({ hours: 7, minutes: 5 }),
    },
    {
      airlineName: 'Cathay Pacific',
      flightNo: 'CX 892',
      departAirportCode: 'HKG',
      departTerminal: '3',
      departAirport: 'Abu Dhabi International Airport',
      departLocation: 'Dubai',
      arriveAirportCode: 'SFO',
      arriveTerminal: '1',
      arriveAirport: 'San Francisco',
      arriveLocation: 'San Francisco',
      departDateTime: moment('2018-03-25 19:15').utcOffset(8),
      arriveDateTime: moment('2018-03-25 16:35').utcOffset(-8),
      duration: moment.duration({ hours: 12, minutes: 20 }),
      layover: moment.duration({ hours: 14, minutes: 15 }),
    },
  ];
  // duration: moment.duration(arriveDateTime.diff(departDateTime)),

  return (
    <Paper className="FlightGroup">
      <p>{origin} - {destination}</p>
      <FlightItem {...flights[0]} />
      <FlightItem {...flights[1]} />
    </Paper>
  );
};
export default FlightGroupComponent;
