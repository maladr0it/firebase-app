import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Recommendation from './Recommendation';

const RecommendationListComponent = ({
  recommendationIds,
}) => (
  <ul>
    {recommendationIds.map(id => (
      <Recommendation key={id} id={id} />
    ))}
  </ul>
);
const mapStateToProps = state => ({
  recommendationIds: []
});
const RecommendationList = connect(
  mapStateToProps,
  null,
)(RecommendationListComponent);
export default RecommendationList;

RecommendationListComponent.propTypes = {
  recommendationIds: PropTypes.arrayOf(string).isRequired,
};
