// example
// reservations = {
//   res198014: {
//     createdAt: 39091051,
//     user: 'usr9190840',
//     description: 'a lovely reservation',
//   },
// };
const defaultState = { };
const defaultReservation = { };

const reservations = (state = defaultState, action) => {
  switch (action.type) {
    case 'RESERVATIONS_UPDATED': {
      const { changes } = action.payload;
      const reservationsData = changes.reduce((acc, reservationDoc) => {
        acc[reservationDoc.id] = reservationDoc.data;
        return acc;
      }, {});
      return {
        ...state,
        ...reservationsData,
      };
    }
    default:
      return state;
  }
};
export default reservations;

export const getReservations = (state, ids = []) => (
  ids.map(id => ({
    id,
    ...state[id] || defaultReservation,
  }))
);
export const getReservation = (state, id) => (
  state[id] || defaultReservation
);
