/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Rec from './Rec';
import FlightCombinations from './FlightCombinations';

class RecListComponent extends React.Component {
  state = {
    expandedRec: null,
  };
  handleSelect = (id) => {
    if (this.state.expandedRec === id) {
      this.setState({
        expandedRec: null,
      });
    } else {
      this.setState({
        expandedRec: id,
      });
    }
  };
  render() {
    const { searchId } = this.props;
    const recommendations = this.props.recommendationIds.map(id => (
      <React.Fragment key={id}>
        <Rec searchId={searchId} recId={id} />
        <button onClick={() => this.handleSelect(id)}>EXP</button>
        {(this.state.expandedRec === id) &&
          <FlightCombinations searchId={searchId} recId={id} />
        }
      </React.Fragment>
    ));
    return (
      <React.Fragment>
        {recommendations}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  recommendationIds: Object.keys(state.flightSearchResults[ownProps.searchId].recommendations),
});
const RecList = connect(
  mapStateToProps,
  null,
)(RecListComponent);
export default RecList;

RecListComponent.propTypes = {
  searchId: PropTypes.string.isRequired,
  recommendationIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};
