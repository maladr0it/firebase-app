const defaultState = {};
// example state
// const flightSuggestions = {
//   SEARCHID1: [
//     {
//       recId: 1,
//       departing: 1,
//       returning: 1,
//     }, {
//       recId: 1,
//       departing: 2,
//       returning: 1,
//     },
//   ],
// };

// should this be an array?
const flightSuggestions = (state = defaultState, action) => {
  switch (action.type) {
    case 'FLIGHT_SUGGESTION_ADDED': {
      const {
        searchId, recId, departingId, returningId,
      } = action.payload;
      console.log(state);
      return {
        ...state,
        [searchId]: (state[searchId] || []).concat({
          recId,
          departingId,
          returningId,
        }),
      };
    }
    default:
      return state;
  }
};
export default flightSuggestions;
