import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Rec from './Rec';
import RecDetail from './RecDetail';

const RecListComponent = ({
  searchId, recommendationIds,
}) => (
  <div>
    {recommendationIds.map(id => (
      <React.Fragment key={id}>
        <Rec searchId={searchId} recId={id} />
        <RecDetail searchId={searchId} recId={id} />
      </React.Fragment>
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
