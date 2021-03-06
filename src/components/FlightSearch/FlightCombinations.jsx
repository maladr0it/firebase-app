import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectFlightGroup } from '../../actions';
import { getRecommendation } from '../../reducers/flightSearchResults';
import { getSelectedFlightGroups } from '../../reducers/flightSearchViews';
import FlightGroup from './FlightGroup';
import Selectable from './Selectable';

const FlightCombinationsComponent = ({
  searchId, recId,
  departureIds, returnIds, oneWay,
  selectedDeparture, selectedReturn,
  validDeparturesByReturn, validReturnsByDeparture,
  onSelectFlightGroup,
}) => {
  const validDepartures = validDeparturesByReturn[selectedReturn] || departureIds;
  const validReturns = validReturnsByDeparture[selectedDeparture] || returnIds;
  const departing = departureIds.map((id) => {
    const isInvalid = !validDepartures.includes(id);
    return (
      <Selectable
        key={id}
        handleSelect={() => onSelectFlightGroup(
          searchId, recId, id,
          'departure', isInvalid,
        )}
        isSelected={id === selectedDeparture}
        isInvalid={isInvalid}
      >
        <FlightGroup
          type="departure"
          searchId={searchId}
          id={id}
        />
      </Selectable>
    );
  });
  const returning = (!oneWay) && returnIds.map((id) => {
    const isInvalid = !validReturns.includes(id);
    return (
      <Selectable
        key={id}
        handleSelect={() => onSelectFlightGroup(
          searchId, recId, id,
          'return', isInvalid,
        )}
        isSelected={id === selectedReturn}
        isInvalid={isInvalid}
      >
        <FlightGroup
          type="return"
          searchId={searchId}
          id={id}
        />
      </Selectable>
    );
  });
  return (
    <div className="FlightCombinations">
      <div className="Column">
        {departing}
      </div>
      <div className="Column">
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
  onSelectFlightGroup: selectFlightGroup,
};
const FlightCombinations = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlightCombinationsComponent);
export default FlightCombinations;

FlightCombinationsComponent.propTypes = {
  searchId: PropTypes.string.isRequired,
  recId: PropTypes.string.isRequired,
  departureIds: PropTypes.arrayOf(PropTypes.string),
  returnIds: PropTypes.arrayOf(PropTypes.string),
  selectedDeparture: PropTypes.string,
  selectedReturn: PropTypes.string,
  validDeparturesByReturn: PropTypes.objectOf(PropTypes.array),
  validReturnsByDeparture: PropTypes.objectOf(PropTypes.array),
  onSelectFlightGroup: PropTypes.func.isRequired,
};
FlightCombinationsComponent.defaultProps = {
  selectedDeparture: '',
  selectedReturn: '',
  departureIds: [],
  returnIds: [],
  validDeparturesByReturn: {},
  validReturnsByDeparture: {},
};
