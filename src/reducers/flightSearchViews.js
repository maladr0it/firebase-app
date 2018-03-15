const defaultState = {};

const flightSearchViews = (state = defaultState, action) => {
  switch (action.type) {
    case 'FLIGHT_SEARCH_RESULT_ADDED': {
      return state;
    }
    case 'DEPARTURE_SELECTED': {
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
    case 'RETURN_SELECTED': {
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
    case 'FLIGHT_GROUPS_DESELECTED': {
      const { searchId, recId } = action.payload;
      return {
        ...state,
        [searchId]: {
          ...state[searchId],
          [recId]: {
            ...(state[searchId] && state[searchId][recId]),
            selectedDeparture: null,
            selectedReturn: null,
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
