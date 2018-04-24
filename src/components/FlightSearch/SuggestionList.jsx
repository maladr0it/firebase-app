import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Suggestion from './Suggestion';
import { flightSuggestionRemoved } from '../../actions';

// list of all added suggestions
// a suggestion is a recommendation with flights chosen

const SuggestionListComponent = ({
  searchId, oneWay, suggestions, handleRemove,
}) => {
  if (suggestions.length === 0) {
    return <div>Add some suggestions</div>;
  }
  console.log(suggestions);
  return (
    <React.Fragment>
      {suggestions.map((sug, i) => (
        <Suggestion
          key={sug.uniqueId}
          searchId={searchId}
          oneWay={oneWay}
          handleRemove={() => handleRemove(searchId, i)}
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
const mapDispatchToProps = {
  handleRemove: flightSuggestionRemoved,
};
const SuggestionList = connect(mapStateToProps, mapDispatchToProps)(SuggestionListComponent);

export default SuggestionList;

SuggestionListComponent.propTypes = {
  searchId: PropTypes.string.isRequired,
  oneWay: PropTypes.bool.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object),
  handleRemove: PropTypes.func.isRequired,
};
SuggestionListComponent.defaultProps = {
  suggestions: [],
};
