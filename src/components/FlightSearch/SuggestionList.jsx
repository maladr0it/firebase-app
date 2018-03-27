import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Suggestion from './Suggestion';
// list of all added suggestions
// a suggestion is a recommendation with flights chosen

const SuggestionListComponent = ({
  searchId, suggestions,
}) => {
  if (suggestions.length === 0) {
    return (
      <div>Add some suggestions</div>
    );
  }
  return (
    <React.Fragment>
      {suggestions.map((sug, i) => (
        <Suggestion
          key={i}
          searchId={searchId}
          {...sug}
        />
      ))}
    </React.Fragment>
  );
};
const mapStateToProps = (state, ownProps) => ({
  suggestions: state.flightSuggestions[ownProps.searchId],
});
const SuggestionList = connect(
  mapStateToProps,
  null,
)(SuggestionListComponent);

export default SuggestionList;

SuggestionListComponent.propTypes = {
  searchId: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object),
};
SuggestionListComponent.defaultProps = {
  suggestions: [],
};
