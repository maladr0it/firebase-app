import React from 'react';
import { connect } from 'react-redux';
import FlightGroupDetail from './FlightGroupDetail';

// this includes a pane for overall booking detail (baggage?)
// as well as more information on flights (terminal, etc)
const RecDetailComponent = ({
  searchId, selectedDeparture, selectedReturn,
}) => {
  console.log('lauched');
  return (
    <div>
      <FlightGroupDetail
    </div>
  );
};
export default RecDetailComponent;
