import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Recommendation from './Recommendation';

const RecommendationListComponent = ({
  searchId, recommendationIds,
}) => (
  <div>
    {recommendationIds.map(id => (
      <Recommendation key={id} searchId={searchId} recId={id} />
    ))}
  </div>
);
const mapStateToProps = (state, ownProps) => ({
  recommendationIds: Object.keys(state.flightSearchResults[ownProps.searchId].recommendations),
});
const RecommendationList = connect(
  mapStateToProps,
  null,
)(RecommendationListComponent);
export default RecommendationList;

RecommendationListComponent.propTypes = {
  searchId: PropTypes.string.isRequired,
  recommendationIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};
