import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { flightGroupSelected } from '../../actions';
import { getRecommendation } from '../../reducers/flightSearchResults';
import { getSelectedFlightGroups } from '../../reducers/flightSearchViews';
import FlightGroup from './FlightGroup';

const RecommendationComponent = ({
  searchId, recId, price,
  departingFlightGroups, returningFlightGroups,
  selectedDepartingFlightGroup, selectedReturningFlightGroup,
  onSelectFlightGroup,
}) => {
  const departing = departingFlightGroups.map(id => (
    <FlightGroup
      key={id}
      type="departing"
      searchId={searchId}
      id={id}
      handleSelect={() => onSelectFlightGroup(searchId, recId, 'departing', id)}
      isSelected={id === selectedDepartingFlightGroup}
    />
  ));
  const returning = returningFlightGroups.map(id => (
    <FlightGroup
      key={id}
      type="returning"
      searchId={searchId}
      id={id}
      handleSelect={() => onSelectFlightGroup(searchId, recId, 'returning', id)}
      isSelected={id === selectedReturningFlightGroup}
    />
  ));
  return (
    <div className="FlightCombinations">
      {price}
      <div className="DeparturesColumn">
        {departing}
      </div>
      <div className="ReturnsColumn">
        {returning}
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  ...getRecommendation(
    state.flightSearchResults,
    ownProps.searchId,
    ownProps.recId,
  ),
  ...getSelectedFlightGroups(
    state.flightSearchViews,
    ownProps.searchId,
    ownProps.recId,
  ),
});
const mapDispatchToProps = {
  onSelectFlightGroup: flightGroupSelected,
};
const Recommendation = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecommendationComponent);
export default Recommendation;

RecommendationComponent.propTypes = {
  searchId: PropTypes.string.isRequired,
  recId: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  departingFlightGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  returningFlightGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedDepartingFlightGroup: PropTypes.string,
  selectedReturningFlightGroup: PropTypes.string,
  onSelectFlightGroup: PropTypes.func.isRequired,
};
RecommendationComponent.defaultProps = {
  selectedDepartingFlightGroup: '',
  selectedReturningFlightGroup: '',
};
