import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecSummary from './RecSummary';

const RecListComponent = ({
  searchId, recommendationIds,
}) => (
  <div>
    {recommendationIds.map(id => (
      <RecSummary key={id} searchId={searchId} recId={id} />
    ))}
  </div>
);
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
