const defaultState = {};
// example state
// const flightSuggestions = {
//   SEARCHID1: [
//     {
//       recId: 1,
//       departingId: 1,
//       returningId: 1,
//     }, {
//       recId: 1,
//       departingId: 2,
//       returningId: 1,
//     },
//   ],
// };

// should this be an array?
// probably bad design in the long-term
// consider storing these server-side
const flightSuggestions = (state = defaultState, action) => {
  switch (action.type) {
    case 'FLIGHT_SUGGESTION_ADDED': {
      const {
        searchId, recId, departingId, returningId,
      } = action.payload;
      return {
        ...state,
        [searchId]: (state[searchId] || []).concat({
          recId,
          departingId,
          returningId,
          uniqueId: Math.random(),
        }),
      };
    }
    case 'FLIGHT_SUGGESTION_REMOVED': {
      const { searchId, index } = action.payload;
      console.log(state[searchId]);
      console.log(index);
      return {
        ...state,
        [searchId]: (state[searchId] || []).filter((sug, i) => (
          (index !== i)
        )),
      };
    }
    default:
      return state;
  }
};
export default flightSuggestions;

export const getNumSuggestions = (state, searchId) => (
  (state[searchId] || []).length
);
