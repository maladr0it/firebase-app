import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Recommendation from './Recommendation';

const RecommendationListComponent = ({
  searchId, recommendationIds,
}) => (
  <div className="RecommendationList">
    {recommendationIds.map(id => (
      <Recommendation key={id} searchId={searchId} recId={id} />
    ))}
  </div>
);
const mapStateToProps = () => ({
  recommendationIds: ['1', '2'],
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
