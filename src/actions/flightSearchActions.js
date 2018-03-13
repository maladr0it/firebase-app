export const flightGroupSelected = (searchId, recId, type, id) => {
  if (type === 'departing') {
    return {
      type: 'DEPARTING_FLIGHT_GROUP_SELECTED',
      payload: { searchId, recId, id },
    };
  } else if (type === 'returning') {
    return {
      type: 'RETURNING_FLIGHT_GROUP_SELECTED',
      payload: { searchId, recId, id },
    };
  }
  return {}; // to appease linter, may cause problems
};

export const a = 5;
