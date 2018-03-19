import React from 'react';
// list of all added suggestions
// a suggestion is a recommendation with flights chosen

const SuggestionListComponent = ({ suggestions }) => (
  suggestions.map(() => (
    <div>SUGGESTION</div>
  ))
);

export default SuggestionListComponent;
