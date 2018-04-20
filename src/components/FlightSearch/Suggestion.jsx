import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { flightSuggestionRemoved } from '../../actions';
import {
  getRecommendation,
  getBaggageAllowances,
} from '../../reducers/flightSearchResults';

import FlightGroup from './FlightGroup';
import './index.css';

// copy 'REC' structure closely


class SuggestionComponent extends React.Component {
  state = {
    expanded: false,
  };
  toggleExpand = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  }
  render() {
    console.log(this.props.index);
    
    const {
      searchId, recId, index,
      oneWay, price, cancellationPolicy,
      departingId, returningId,
      baggageAllowances,
      handleRemove
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
    const returning = (!oneWay) && (
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
        <RaisedButton
          label={(this.state.expanded ? 'Less' : 'More')}
          primary
          onClick={() => this.toggleExpand()}
        />
        <RaisedButton
          label="Remove"
          secondary
          onClick={() => {
            console.log('handle remove');
            console.log(index);
            handleRemove(searchId, index);
          }}
        />
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
const mapDispatchToProps = ({
  handleRemove: flightSuggestionRemoved,
});
const Suggestion = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuggestionComponent);

export default Suggestion;

Suggestion.propTypes = {
  searchId: PropTypes.string.isRequired,
  oneWay: PropTypes.bool.isRequired,
  departingId: PropTypes.string.isRequired,
  returningId: PropTypes.string.isRequired,
};
