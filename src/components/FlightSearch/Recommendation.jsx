import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { flightGroupSelected } from '../../actions';
import { getRecommendation } from '../../reducers/flightSearchResults';
import { getSelectedFlightGroups } from '../../reducers/flightSearchViews';
import FlightGroup from './FlightGroup';

const RecommendationComponent = ({
  searchId, recId, price,
  departureIds, returnIds,
  selectedDeparture, selectedReturn,
  validDeparturesByReturn, validReturnsByDeparture,
  onSelectFlightGroup,
}) => {
  const validDepartures = validDeparturesByReturn[selectedReturn] || departureIds;
  const validReturns = validReturnsByDeparture[selectedDeparture] || returnIds;
  const departing = departureIds.map(id => (
    <FlightGroup
      key={id}
      type="departing"
      searchId={searchId}
      id={id}
      handleSelect={() => onSelectFlightGroup(searchId, recId, 'departing', id)}
      isSelected={id === selectedDeparture}
      isInvalid={!validDepartures.includes(id)}
    />
  ));
  const returning = returnIds.map(id => (
    <FlightGroup
      key={id}
      type="returning"
      searchId={searchId}
      id={id}
      handleSelect={() => onSelectFlightGroup(searchId, recId, 'returning', id)}
      isSelected={id === selectedReturn}
      isInvalid={!validReturns.includes(id)}
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
  departureIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  returnIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedDeparture: PropTypes.string,
  selectedReturn: PropTypes.string,
  validDeparturesByReturn: PropTypes.objectOf(PropTypes.array).isRequired,
  validReturnsByDeparture: PropTypes.objectOf(PropTypes.array).isRequired,
  onSelectFlightGroup: PropTypes.func.isRequired,
};
RecommendationComponent.defaultProps = {
  selectedDeparture: '',
  selectedReturn: '',
};
