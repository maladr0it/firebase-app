const defaultState = {};

const flightSearchViews = (state = defaultState, action) => {
  switch (action.type) {
    case 'FLIGHT_SEARCH_RESULT_ADDED': {
      const { searchId, searchData } = action.payload;
      const defaultView = Object.entries(searchData.recommendations)
        .reduce((acc, entry) => {
          const [recId, rec] = entry;
          const selectedDeparture = rec.departureIds[0];
          const selectedReturn = rec.validReturnsByDeparture[selectedDeparture][0];
          acc[recId] = { selectedDeparture, selectedReturn };
          return acc;
        }, {});
      return {
        ...state,
        [searchId]: defaultView,
      };
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
