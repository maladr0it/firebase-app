const flightGroupsDeselected = (searchId, recId) => ({
  type: 'FLIGHT_GROUPS_DESELECTED',
  payload: { searchId, recId },
});
const departureSelected = (searchId, recId, id) => ({
  type: 'DEPARTURE_SELECTED',
  payload: { searchId, recId, id },
});
const returnSelected = (searchId, recId, id) => ({
  type: 'RETURN_SELECTED',
  payload: { searchId, recId, id },
});

// thunks
export const selectFlightGroup = (
  searchId, recId, id,
  type, isInvalid,
) => (dispatch) => {
  console.log(type);
  if (isInvalid) {
    dispatch(flightGroupsDeselected(searchId, recId));
  }
  if (type === 'departure') {
    dispatch(departureSelected(searchId, recId, id));
  } else if (type === 'return') {
    dispatch(returnSelected(searchId, recId, id));
  }
};
export const a = 5;

