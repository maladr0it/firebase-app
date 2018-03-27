const defaultState = {};

const flightSearchResults = (state = defaultState, action) => {
  switch (action.type) {
    case 'FLIGHT_SEARCH_RESULT_ADDED': {
      const { searchId, searchData } = action.payload;
      return {
        ...state,
        [searchId]: searchData,
      };
    }
    default:
      return state;
  }
};
export default flightSearchResults;

export const getRecommendation = (state, searchId, id) => (
  state[searchId] && state[searchId].recommendations[id]
);
export const getFlightGroup = (state, searchId, type, id) => {
  if (type === 'departure') {
    return state[searchId] && state[searchId].departures[id];
  } else if (type === 'return') {
    return state[searchId] && state[searchId].returns[id];
  }
  return null;
};
// TODO: setting defaults this way is inflexible
export const getBaggageAllowances = (state, searchId, departureId, returnId) => (
  state[searchId] &&
  state[searchId].baggageAllowances[`${departureId}_${returnId}`]
);
  //   (
//     state[searchId] &&
//     state[searchId].baggageAllowances[`${departureId}_${returnId}`]
//   ) || {
//     departing: null,
//     returning: null,
//   }
