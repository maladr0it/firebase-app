import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Rec from './Rec';

const RecListComponent = ({
  searchId, recommendationIds, oneWay,
}) => {
  const recommendations = recommendationIds.map(id => (
    <Rec key={id} searchId={searchId} recId={id} oneWay={oneWay} />
  ));
  return (
    <React.Fragment>
      {recommendations}
    </React.Fragment>
  );
};
const mapStateToProps = (state, ownProps) => ({
  recommendationIds: Object.keys(state.flightSearchResults[ownProps.searchId].recommendations),
  oneWay: state.flightSearchResults[ownProps.searchId].oneWay,
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
