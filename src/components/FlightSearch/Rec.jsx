import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { flightSuggestionAdded } from '../../actions';
import { getSelectedFlightGroups } from '../../reducers/flightSearchViews';
import {
  getRecommendation,
  getBaggageAllowances,
} from '../../reducers/flightSearchResults';
import FlightGroup from './FlightGroup';
import FlightGroupDetail from './FlightGroupDetail';
import FlightCombinations from './FlightCombinations';

import './index.css';

class RecComponent extends React.Component {
  state = {
    expanded: false,
  };
  toggleExpand = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };
  render() {
    const {
      searchId, recId, price, cancellationPolicy,
      selectedDeparture, selectedReturn,
      baggageAllowances,
      handleAdd,

      oneWay,
    } = this.props;

    const departing = this.state.expanded ? (
      <FlightGroupDetail
        type="departure"
        searchId={searchId}
        id={selectedDeparture}
        baggageAllowance={baggageAllowances.departing}
      />
    ) : (
      <FlightGroup
        type="departure"
        searchId={searchId}
        id={selectedDeparture}
      />
    );
    const returning = (!oneWay) && (this.state.expanded ? (
      <FlightGroupDetail
        type="return"
        searchId={searchId}
        id={selectedReturn}
        baggageAllowance={baggageAllowances.returning}
      />
    ) : (
      <FlightGroup
        type="return"
        searchId={searchId}
        id={selectedReturn}
      />
    ));
    return (
      <React.Fragment>
        <h3>{price}</h3>
        <RaisedButton
          label={(this.state.expanded ? 'Less' : 'More')}
          primary
          onClick={() => this.toggleExpand()}
        />
        <RaisedButton
          label="Add"
          disabled={(!oneWay && (!selectedDeparture || !selectedReturn))}
          onClick={() => handleAdd(
            searchId, recId,
            selectedDeparture, selectedReturn,
          )}
        />
        {(this.state.expanded) && <FlightCombinations searchId={searchId} recId={recId} />}
        <div className="DepartReturnPanes">
          <div className="LeftPane">
            {departing}
          </div>
          <div className="RightPane">
            {returning}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const recommendation = getRecommendation(
    state.flightSearchResults,
    ownProps.searchId,
    ownProps.recId,
  );
  const { selectedDeparture, selectedReturn } = getSelectedFlightGroups(
    state.flightSearchViews,
    ownProps.searchId,
    ownProps.recId,
  );
  const baggageAllowances = getBaggageAllowances(
    state.flightSearchResults,
    ownProps.searchId,
    selectedDeparture,
    selectedReturn,
  );
  return ({
    ...recommendation,
    selectedDeparture,
    selectedReturn,
    baggageAllowances,
  });
};
const mapDispatchToProps = {
  handleAdd: flightSuggestionAdded,
};
const Rec = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecComponent);
export default Rec;

RecComponent.propTypes = {
  searchId: PropTypes.string.isRequired,
  recId: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  cancellationPolicy: PropTypes.string.isRequired,
  selectedDeparture: PropTypes.string,
  selectedReturn: PropTypes.string,
  baggageAllowances: PropTypes.objectOf(PropTypes.string),
  handleAdd: PropTypes.func.isRequired,
};
RecComponent.defaultProps = {
  selectedDeparture: '',
  selectedReturn: '',
  // should a default object shape be set here?
  baggageAllowances: { departing: null, arriving: null },
};


// const flightGroups = (this.state.expanded) ? (
//   <React.Fragment>
//     <FlightCombinations searchId={searchId} recId={recId} />
//     <div className="DepartReturnPanes">
//       <div className="LeftPane">
//         <FlightGroupDetail
//           type="departure"
//           searchId={searchId}
//           id={selectedDeparture}
//           baggageAllowance={baggageAllowances.departing}
//         />
//       </div>
//       <div className="RightPane">
//         <FlightGroupDetail
//           type="return"
//           searchId={searchId}
//           id={selectedReturn}
//           baggageAllowance={baggageAllowances.returning}
//         />
//       </div>
//     </div>
//     <div>Cancellation Policy: {cancellationPolicy}</div>
//   </React.Fragment>
// ) : (
//   <div className="DepartReturnPanes">
//     <div className="LeftPane">
//       <FlightGroup
//         type="departure"
//         searchId={searchId}
//         id={selectedDeparture}
//       />
//     </div>
//     <div className="RightPane">
//       <FlightGroup
//         type="return"
//         searchId={searchId}
//         id={selectedReturn}
//       />
//     </div>
//   </div>
// );
