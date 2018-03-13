const defaultState = {};

const flightSearchViews = (state = defaultState, action) => {
  switch (action.type) {
    case 'DEPARTING_FLIGHT_GROUP_SELECTED': {
      const { searchId, recId, id } = action.payload;
      return {
        ...state,
        [searchId]: {
          ...state[searchId],
          [recId]: {
            ...(state[searchId] && state[searchId][recId]),
            selectedDeparture: id,
          },
        },
      };
    }
    case 'RETURNING_FLIGHT_GROUP_SELECTED': {
      const { searchId, recId, id } = action.payload;
      return {
        ...state,
        [searchId]: {
          ...state[searchId],
          [recId]: {
            ...(state[searchId] && state[searchId][recId]),
            selectedReturn: id,
          },
        },
      };
    }
    default:
      return state;
  }
};
export default flightSearchViews;

export const getSelectedFlightGroups = (state, searchId, recId) => (
  (state[searchId] && state[searchId][recId])
);
