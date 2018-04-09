import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Suggestion from './Suggestion';
// list of all added suggestions
// a suggestion is a recommendation with flights chosen

const SuggestionListComponent = ({
  searchId, oneWay, suggestions,
}) => {
  if (suggestions.length === 0) {
    return (
      <div>Add some suggestions</div>
    );
  }
  console.log(suggestions);
  return (
    <React.Fragment>
      {suggestions.map((sug, i) => (
        <Suggestion
          key={i}
          searchId={searchId}
          oneWay={oneWay}
          {...sug}
        />
      ))}
    </React.Fragment>
  );
};
const mapStateToProps = (state, ownProps) => ({
  suggestions: state.flightSuggestions[ownProps.searchId],
  oneWay: state.flightSearchResults[ownProps.searchId].oneWay,
});
const SuggestionList = connect(
  mapStateToProps,
  null,
)(SuggestionListComponent);

export default SuggestionList;

SuggestionListComponent.propTypes = {
  searchId: PropTypes.string.isRequired,
  oneWay: PropTypes.bool.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object),
};
SuggestionListComponent.defaultProps = {
  suggestions: [],
};
