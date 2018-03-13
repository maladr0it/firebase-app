const defaultState = {
  SEARCHID1: {
    origin: 'Dubai',
    destination: 'Los Angeles',
    departures: {
      1: [
        {
          carrierCode: 'CX',
          flightNo: 'CX 746',
          departAirportCode: 'DBX',
          departTerminal: '3',
          departDateTime: '2018-03-24 17:55',
          arriveAirportCode: 'HKG',
          arriveTerminal: '1',
          arriveDateTime: '2018-03-25 05:00',
          duration: '7h5m',
        }, {
          carrierCode: 'CX',
          flightNo: 'CX 892',
          departAirportCode: 'HKG',
          departTerminal: '3',
          departDateTime: '2018-03-25 19:15',
          arriveAirportCode: 'SFO',
          arriveTerminal: '1',
          arriveDateTime: '2018-03-25 16:35',
          duration: '12h20m',
          layover: '14h15m',
        },
      ],
      2: [
        {
          carrierCode: 'CX',
          flightNo: 'CX 746',
          departAirportCode: 'DBX',
          departTerminal: '1',
          departDateTime: '2018-03-24 17:55',
          arriveAirportCode: 'HKG',
          arriveTerminal: '1',
          arriveDateTime: '2018-03-25 05:00',
          duration: '7h5m',
        },
      ],
    },
    returns: {
      1: [
        {
          carrierCode: 'CX',
          flightNo: 'CX 746',
          departAirportCode: 'DBX',
          departTerminal: '1',
          departDateTime: '2018-03-24 17:55',
          arriveAirportCode: 'HKG',
          arriveTerminal: '1',
          arriveDateTime: '2018-03-25 05:00',
          duration: '7h5m',
        },
      ],
      2: [
        {
          flightNo: 'CX 879',
          departAirportCode: 'SFO',
          departTerminal: '1',
          departDateTime: '2018-03-28 13:05',
          arriveAirportCode: 'HKG',
          arriveTerminal: '1',
          arriveDateTime: '2018-03-29 18:55',
          duration: '14h50m',
        }, {
          flightNo: 'CX 745',
          departAirportCode: 'HKG',
          departTerminal: '1',
          departDateTime: '2018-03-30 01:25',
          arriveAirportCode: 'DXB',
          arriveTerminal: '1',
          arriveDateTime: '2018-03-29 18:55',
          duration: '14h50m',
          layover: '14h15m',
        },
      ],
    },
    recommendations: {
      1: {
        price: '$850',
        departureIds: ['1', '2'],
        returnIds: ['1', '2'],
        validReturnsByDeparture: {
          1: ['1', '2'],
          2: ['2'],
        },
        validDeparturesByReturn: {
          1: ['1'],
          2: ['1', '2'],
        },
        // not necessary?
        validCombinations: {
          '1_1': true,
          '1_2': true,
          '2_2': true,
        },
      },
      2: {
        price: '$900',
        departureIds: ['2'],
        returnIds: ['1'],
        validReturnsByDeparture: {
          2: ['1'],
        },
        validDeparturesByReturn: {
          1: ['2'],
        },
        // not necessary?
        validCombinations: {
          '2_1': true,
        },
      },
    },
  },
};

const flightSearchResults = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default flightSearchResults;

export const getRecommendation = (state, searchId, id) => (
  state[searchId] && state[searchId].recommendations[id]
);
export const getFlightGroup = (state, searchId, type, id) => {
  if (type === 'departing') {
    return state[searchId] && state[searchId].departures[id];
  } else if (type === 'returning') {
    return state[searchId] && state[searchId].returns[id];
  }
  return null;
};
// returns an array of ids
// export const getValidReturns = (state, searchId, recId) => (
//   state[searchId]
//     && state[searchId].recommendations[recId]
//     && state[searchId].recommendations[recId].validReturnsByDeparture[recId]
// );
