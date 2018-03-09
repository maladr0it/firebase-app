import React from 'react';
import RecommendationList from './RecommendationList';

const FlightSearchComponent = () => (
  <RecommendationList searchId="SEARCHID1" />
);

export default FlightSearchComponent;

// <div className="FlightCombinations">
//   <div className="DeparturesColumn">
//     {departures.map((flightGroup, i) => (
//       <FlightGroup key={i} {...flightGroup} />
//     ))}
//   </div>
//   <div className="ReturnsColumn">
//     {returns.map((flightGroup, i) => (
//       <FlightGroup key={i} {...flightGroup} />
//     ))}
//   </div>
// </div>
