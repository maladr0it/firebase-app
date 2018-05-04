import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { getRecommendation, getBaggageAllowances } from '../../reducers/flightSearchResults';

import FlightGroup from './FlightGroup';
import './index.css';

// TODO: this is a near duplicate of Rec
// consider a prop to conditionally change
// the behaviour

class SuggestionComponent extends React.Component {
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
      searchId, // recId, <- accessible
      oneWay,
      price,
      cancellationPolicy,
      departingId,
      returningId,
      baggageAllowances,
      handleRemove,
    } = this.props;

    const departing = (
      <FlightGroup
        type="departure"
        searchId={searchId}
        id={departingId}
        baggageAllowance={baggageAllowances.departing}
        detail={this.state.expanded}
      />
    );
    const returning = !oneWay && (
      <FlightGroup
        type="return"
        searchId={searchId}
        id={returningId}
        baggageAllowance={baggageAllowances.returning}
        detail={this.state.expanded}
      />
    );
    return (
      <React.Fragment>
        <h3>{price}</h3>
        <RaisedButton
          label={this.state.expanded ? 'Less' : 'More'}
          primary
          onClick={() => this.toggleExpand()}
        />
        <RaisedButton label="Remove" secondary onClick={() => handleRemove()} />
        <div className="DepartReturnPanes">
          <div className="LeftPane">{departing}</div>
          <div className="RightPane">{returning}</div>
        </div>
        <p>{cancellationPolicy}</p>
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
  const baggageAllowances = getBaggageAllowances(
    state.flightSearchResults,
    ownProps.searchId,
    ownProps.departingId,
    ownProps.returningId,
  );
  return {
    ...recommendation,
    baggageAllowances,
    oneWay: state.flightSearchResults[ownProps.searchId].oneWay,
  };
};
const Suggestion = connect(mapStateToProps, null)(SuggestionComponent);

export default Suggestion;

SuggestionComponent.propTypes = {
  searchId: PropTypes.string.isRequired,
  oneWay: PropTypes.bool.isRequired,
  price: PropTypes.string.isRequired,
  cancellationPolicy: PropTypes.string.isRequired,
  departingId: PropTypes.string.isRequired,
  returningId: PropTypes.string.isRequired,
  baggageAllowances: PropTypes.objectOf(PropTypes.string),
  handleRemove: PropTypes.func.isRequired,
};
SuggestionComponent.defaultProps = {
  // should a default object shape be set here?
  baggageAllowances: { departing: null, arriving: null },
};
