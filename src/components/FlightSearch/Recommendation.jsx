import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRecommendation } from '../../reducers/flightSearchResults';
import FlightGroup from './FlightGroup';

const RecommendationComponent = ({
  searchId, price,
  departingFlightGroups, returningFlightGroups,
}) => {
  console.log(price);
  console.log(departingFlightGroups);
  const departing = departingFlightGroups.map(id => (
    <FlightGroup
      key={id}
      type="departing"
      searchId={searchId}
      id={id}
    />
  ));
  const returning = returningFlightGroups.map(id => (
    <FlightGroup
      key={id}
      type="returning"
      searchId={searchId}
      id={id}
    />
  ));
  return (
    <div>
      PRICE: {price}
      DEPARTING: {departing}
      RETRUNING: {returning}
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  ...getRecommendation(
    state.flightSearchResults,
    ownProps.searchId,
    ownProps.recId,
  ),
});
const Recommendation = connect(
  mapStateToProps,
  null,
)(RecommendationComponent);
export default Recommendation;

RecommendationComponent.propTypes = {
  searchId: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  departingFlightGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  returningFlightGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
};
