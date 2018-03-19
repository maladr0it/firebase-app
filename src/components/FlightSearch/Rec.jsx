import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSelectedFlightGroups } from '../../reducers/flightSearchViews';
import { getRecommendation } from '../../reducers/flightSearchResults';
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
      searchId, recId, price,
      selectedDeparture, selectedReturn,
    } = this.props;

    const flightGroups = (this.state.expanded) ? (
      <React.Fragment>
        <FlightCombinations searchId={searchId} recId={recId} />
        <div className="DepartReturnPanes">
          <div className="LeftPane">
            <FlightGroupDetail
              type="departure"
              searchId={searchId}
              id={selectedDeparture}
            />
          </div>
          <div className="RightPane">
            <FlightGroupDetail
              type="return"
              searchId={searchId}
              id={selectedReturn}
            />
          </div>
        </div>
      </React.Fragment>
    ) : (
      <div className="DepartReturnPanes">
        <div className="LeftPane">
          <FlightGroup
            type="departure"
            searchId={searchId}
            id={selectedDeparture}
          />
        </div>
        <div className="RightPane">
          <FlightGroup
            type="return"
            searchId={searchId}
            id={selectedReturn}
          />
        </div>
      </div>
    );
    return (
      <div className="Rec">
        <h3>{price}</h3>
        <button onClick={() => this.toggleExpand()}>
          EXP
        </button>
        {flightGroups}
      </div>
    );
  }
}
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
const Rec = connect(
  mapStateToProps,
  null,
)(RecComponent);
export default Rec;

RecComponent.propTypes = {
  searchId: PropTypes.string.isRequired,
  recId: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  selectedDeparture: PropTypes.string,
  selectedReturn: PropTypes.string,
};
RecComponent.defaultProps = {
  selectedDeparture: '',
  selectedReturn: '',
};
