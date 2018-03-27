import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';

import RecList from './RecList';
import SuggestionList from './SuggestionList';
import { flightSearchResultAdded } from '../../actions';

import './index.css';


const searchData1 = {
  origin: 'Tokyo',
  destination: 'Melbourne',
  departures: {
    1: [
      {
        carrierCode: 'JQ',
        flightNo: 'JQ 12',
        departAirportCode: 'NRT',
        departTerminal: '3',
        departDateTime: '2018-04-11 21:05',
        arriveAirportCode: 'OOL',
        arriveTerminal: '1',
        arriveDateTime: '2018-04-12 06:55',
        duration: '8h50m',
      }, {
        carrierCode: 'JQ',
        flightNo: 'JQ 435',
        departAirportCode: 'OOL',
        departTerminal: 'D',
        departDateTime: '2018-04-12 08:40',
        arriveAirportCode: 'MEL',
        arriveTerminal: '4',
        arriveDateTime: '2018-04-12 11:05',
        duration: '2h25m',
        layover: '1h45m',
      },
    ],
    2: [
      {
        carrierCode: 'CA',
        flightNo: 'CA 930',
        departAirportCode: 'NRT',
        departTerminal: '1',
        departDateTime: '2018-04-11 14:55',
        arriveAirportCode: 'PVG',
        arriveTerminal: '2',
        arriveDateTime: '2018-04-11 17:10',
        duration: '3h15m',
      }, {
        carrierCode: 'CA',
        flightNo: 'CA 177',
        departAirportCode: 'PVG',
        departTerminal: '2',
        departDateTime: '2018-04-11 19:15',
        arriveAirportCode: 'MEL',
        arriveTerminal: '2',
        arriveDateTime: '2018-04-12 08:05',
        duration: '10h50m',
        layover: '2h5m',
      },
    ],
    3: [
      {
        carrierCode: 'MH',
        flightNo: 'MH 71',
        departAirportCode: 'NRT',
        departTerminal: '2',
        departDateTime: '2018-04-11 21:40',
        arriveAirportCode: 'KUL',
        arriveTerminal: 'M',
        arriveDateTime: '2018-04-12 04:10',
        duration: '7h30m',
      }, {
        carrierCode: 'MH',
        flightNo: 'MH 129',
        departAirportCode: 'KUL',
        departTerminal: 'M',
        departDateTime: '2018-04-12 09:20',
        arriveAirportCode: 'MEL',
        arriveTerminal: '2',
        arriveDateTime: '2018-04-12 19:15',
        duration: '7h55m',
        layover: '5h10m',
      },
    ],
    4: [
      {
        carrierCode: 'MH',
        flightNo: 'MH 89',
        departAirportCode: 'NRT',
        departTerminal: '2',
        departDateTime: '2018-04-11 10:20',
        arriveAirportCode: 'KUL',
        arriveTerminal: 'M',
        arriveDateTime: '2018-04-11 16:45',
        duration: '7h25m',
      }, {
        carrierCode: 'MH',
        flightNo: 'MH 129',
        departAirportCode: 'KUL',
        departTerminal: 'M',
        departDateTime: '2018-04-12 09:20',
        arriveAirportCode: 'MEL',
        arriveTerminal: '2',
        arriveDateTime: '2018-04-12 19:15',
        duration: '7h55m',
        layover: '16h35m',
      },
    ],
    5: [
      {
        carrierCode: 'QF',
        flightNo: 'QF 62',
        departAirportCode: 'NRT',
        departTerminal: '2',
        departDateTime: '2018-04-11 19:55',
        arriveAirportCode: 'BNE',
        arriveTerminal: '1',
        arriveDateTime: '2018-04-12 05:55',
        duration: '7h',
      }, {
        carrierCode: 'QF',
        flightNo: 'QF 611',
        departAirportCode: 'BNE',
        departTerminal: 'D',
        departDateTime: '2018-04-12 08:00',
        arriveAirportCode: 'MEL',
        arriveTerminal: '1',
        arriveDateTime: '2018-04-12 10:25',
        duration: '2h25m',
        layover: '2h5m',
      },
    ],
    6: [
      {
        carrierCode: 'QF',
        flightNo: 'QF 62',
        departAirportCode: 'NRT',
        departTerminal: '2',
        departDateTime: '2018-04-11 19:55',
        arriveAirportCode: 'BNE',
        arriveTerminal: '1',
        arriveDateTime: '2018-04-12 05:55',
        duration: '7h',
      }, {
        carrierCode: 'QF',
        flightNo: 'QF 615',
        departAirportCode: 'BNE',
        departTerminal: 'D',
        departDateTime: '2018-04-12 10:00',
        arriveAirportCode: 'MEL',
        arriveTerminal: '1',
        arriveDateTime: '2018-04-12 12:25',
        duration: '2h25m',
        layover: '4h5m',
      },
    ],
    7: [
      {
        carrierCode: 'QF',
        flightNo: 'QF 62',
        departAirportCode: 'NRT',
        departTerminal: '2',
        departDateTime: '2018-04-11 19:55',
        arriveAirportCode: 'BNE',
        arriveTerminal: '1',
        arriveDateTime: '2018-04-12 05:55',
        duration: '7h',
      }, {
        carrierCode: 'QF',
        flightNo: 'QF 617',
        departAirportCode: 'BNE',
        departTerminal: 'D',
        departDateTime: '2018-04-12 11:00',
        arriveAirportCode: 'MEL',
        arriveTerminal: '1',
        arriveDateTime: '2018-04-12 13:25',
        duration: '2h25m',
        layover: '5h5m',
      },
    ],
  },
  returns: {
    1: [
      {
        carrierCode: 'JQ',
        flightNo: 'JQ 11',
        departAirportCode: 'MEL',
        departTerminal: '2',
        departDateTime: '2018-04-15 07:15',
        arriveAirportCode: 'OOL',
        arriveTerminal: '',
        arriveDateTime: '2018-04-15 09:15',
        duration: '2h',
      }, {
        carrierCode: 'JQ',
        flightNo: 'JQ 11',
        departAirportCode: 'OOL',
        departTerminal: '',
        departDateTime: '2018-04-15 10:45',
        arriveAirportCode: 'NRT',
        arriveTerminal: '3',
        arriveDateTime: '2018-04-15 18:55',
        duration: '9h10m',
        layover: '1h30m',
      },
    ],
    2: [
      {
        carrierCode: 'CA',
        flightNo: 'CA 166',
        departAirportCode: 'MEL',
        departTerminal: '2',
        departDateTime: '2018-04-15 20:00',
        arriveAirportCode: 'PEK',
        arriveTerminal: '3',
        arriveDateTime: '2018-04-16 05:50',
        duration: '11h50m',
      }, {
        carrierCode: 'CA',
        flightNo: 'CA 167',
        departAirportCode: 'PEK',
        departTerminal: '3',
        departDateTime: '2018-04-16 12:50',
        arriveAirportCode: 'HND',
        arriveTerminal: '1',
        arriveDateTime: '2018-04-16 17:25',
        duration: '3h35m',
        layover: '7h',
      },
    ],
    3: [
      {
        carrierCode: 'CA',
        flightNo: 'CA 166',
        departAirportCode: 'MEL',
        departTerminal: '2',
        departDateTime: '2018-04-15 20:00',
        arriveAirportCode: 'PEK',
        arriveTerminal: '3',
        arriveDateTime: '2018-04-16 05:50',
        duration: '11h50m',
      }, {
        carrierCode: 'CA',
        flightNo: 'CA 421',
        departAirportCode: 'PEK',
        departTerminal: '3',
        departDateTime: '2018-04-16 14:35',
        arriveAirportCode: 'HND',
        arriveTerminal: '1',
        arriveDateTime: '2018-04-16 18:55',
        duration: '3h20m',
        layover: '8h45m',
      },
    ],
    4: [
      {
        carrierCode: 'CA',
        flightNo: 'CA 166',
        departAirportCode: 'MEL',
        departTerminal: '2',
        departDateTime: '2018-04-15 20:00',
        arriveAirportCode: 'PEK',
        arriveTerminal: '3',
        arriveDateTime: '2018-04-16 05:50',
        duration: '11h50m',
      }, {
        carrierCode: 'CA',
        flightNo: 'CA 183',
        departAirportCode: 'PEK',
        departTerminal: '3',
        departDateTime: '2018-04-16 17:10',
        arriveAirportCode: 'HND',
        arriveTerminal: '1',
        arriveDateTime: '2018-04-16 21:30',
        duration: '3h20m',
        layover: '11h20m',
      },
    ],
    5: [
      {
        carrierCode: 'MH',
        flightNo: 'MH 148',
        departAirportCode: 'MEL',
        departTerminal: '2',
        departDateTime: '2018-04-15 13:55',
        arriveAirportCode: 'KUL',
        arriveTerminal: 'M',
        arriveDateTime: '2018-04-15 20:30',
        duration: '8h35m',
      }, {
        carrierCode: 'MH',
        flightNo: 'MH 9918',
        departAirportCode: 'KUL',
        departTerminal: 'M',
        departDateTime: '2018-04-16 22:50',
        arriveAirportCode: 'NRT',
        arriveTerminal: '2',
        arriveDateTime: '2018-04-17 06:45',
        duration: '6h55m',
        layover: '2h20m',
      },
    ],
    6: [
      {
        carrierCode: 'MH',
        flightNo: 'MH 128',
        departAirportCode: 'MEL',
        departTerminal: '2',
        departDateTime: '2018-04-15 23:25',
        arriveAirportCode: 'KUL',
        arriveTerminal: 'M',
        arriveDateTime: '2018-04-16 06:00',
        duration: '8h35m',
      }, {
        carrierCode: 'MH',
        flightNo: 'MH 9918',
        departAirportCode: 'KUL',
        departTerminal: 'M',
        departDateTime: '2018-04-16 22:50',
        arriveAirportCode: 'NRT',
        arriveTerminal: '2',
        arriveDateTime: '2018-04-17 06:45',
        duration: '6h55m',
        layover: '16h50m',
      },
    ],
    7: [
      {
        carrierCode: 'QF',
        flightNo: 'QF 79',
        departAirportCode: 'MEL',
        departTerminal: '2',
        departDateTime: '2018-04-15 09:10',
        arriveAirportCode: 'NRT',
        arriveTerminal: '2',
        arriveDateTime: '2018-04-15 18:35',
        duration: '10h25m',
      },
    ],
  },
  baggageAllowances: {
    '1_1': {
      departing: '7 kg',
      returning: '7 kg',
    },
    '2_2': {
      departing: '2pc 7kg',
      returning: '2pc 7kg',
    },
    '2_3': {
      departing: '2pc 7kg',
      returning: '2pc 7kg',
    },
    '2_4': {
      departing: '2pc 7kg',
      returning: '2pc 7kg',
    },
    '3_6': {
      departing: '30kg 7kg',
      returning: '30kg 7kg',
    },
    '4_5': {
      departing: '30kg 7kg',
      returning: '30kg 7kg',
    },
    '5_7': {
      departing: '30kg 7kg',
      returning: '30kg 7kg',
    },
    '6_7': {
      departing: '30kg 7kg',
      returning: '30kg 7kg',
    },
    '7_7': {
      departing: '30kg 7kg',
      returning: '30kg 7kg',
    },
  },
  recommendations: {
    1: {
      price: '¥40,681',
      cancellationPolicy: 'Non Refundable',
      departureIds: ['1'],
      returnIds: ['1'],
      validReturnsByDeparture: {
        1: ['1'],
      },
      validDeparturesByReturn: {
        1: ['1'],
      },
    },
    2: {
      price: '¥66,109',
      cancellationPolicy: 'Refundable',
      departureIds: ['2'],
      returnIds: ['2', '3', '4'],
      validReturnsByDeparture: {
        2: ['2', '3', '4'],
      },
      validDeparturesByReturn: {
        2: ['2'],
        3: ['2'],
        4: ['2'],
      },
    },
    3: {
      price: '¥66,818',
      cancellationPolicy: 'Refundable',
      departureIds: ['3', '4'],
      returnIds: ['5', '6'],
      validReturnsByDeparture: {
        3: ['6'],
        4: ['5'],
      },
      validDeparturesByReturn: {
        5: ['4'],
        6: ['3'],
      },
    },
    4: {
      price: '¥74,550',
      cancellationPolicy: 'Refundable',
      departureIds: ['5', '6', '7'],
      returnIds: ['7'],
      validReturnsByDeparture: {
        5: ['7'],
        6: ['7'],
        7: ['7'],
      },
      validDeparturesByReturn: {
        7: ['5', '6', '7'],
      },
    },
  },
};

const searchData2 = {
  origin: 'San Francisco',
  destination: 'Osaka',
  departures: {
    1: [
      {
        carrierCode: 'MU',
        flightNo: 'MU 590',
        departAirportCode: 'SFO',
        departTerminal: '1',
        departDateTime: '2018-05-02 12:00',
        arriveAirportCode: 'PVG',
        arriveTerminal: '1',
        arriveDateTime: '2018-05-03 16:30',
        duration: '13h30m',
      }, {
        carrierCode: 'MU',
        flightNo: 'MU 729',
        departAirportCode: 'PVG',
        departTerminal: '1',
        departDateTime: '2018-05-03 18:15',
        arriveAirportCode: 'KIX',
        arriveTerminal: '1',
        arriveDateTime: '2018-05-03 21:30',
        duration: '2h15m',
        layover: '1h45m',
      },
    ],
    2: [
      {
        carrierCode: 'MU',
        flightNo: 'MU 590',
        departAirportCode: 'SFO',
        departTerminal: '1',
        departDateTime: '2018-05-02 12:00',
        arriveAirportCode: 'PVG',
        arriveTerminal: '1',
        arriveDateTime: '2018-05-03 16:30',
        duration: '13h30m',
      }, {
        carrierCode: 'MU',
        flightNo: 'MU 515',
        departAirportCode: 'PVG',
        departTerminal: '1',
        departDateTime: '2018-05-04 10:15',
        arriveAirportCode: 'KIX',
        arriveTerminal: '1',
        arriveDateTime: '2018-05-04 13:10',
        duration: '1h55m',
        layover: '17h45m',
      },
    ],
    3: [
      {
        carrierCode: 'MU',
        flightNo: 'MU 590',
        departAirportCode: 'SFO',
        departTerminal: '1',
        departDateTime: '2018-05-02 12:00',
        arriveAirportCode: 'PVG',
        arriveTerminal: '1',
        arriveDateTime: '2018-05-03 16:30',
        duration: '13h30m',
      }, {
        carrierCode: 'MU',
        flightNo: 'MU 225',
        departAirportCode: 'PVG',
        departTerminal: '1',
        departDateTime: '2018-05-04 09:15',
        arriveAirportCode: 'KIX',
        arriveTerminal: '1',
        arriveDateTime: '2018-05-04 12:10',
        duration: '1h55m',
        layover: '16h45m',
      },
    ],
    4: [
      {
        carrierCode: 'MU',
        flightNo: 'MU 590',
        departAirportCode: 'SFO',
        departTerminal: '1',
        departDateTime: '2018-05-02 12:00',
        arriveAirportCode: 'PVG',
        arriveTerminal: '1',
        arriveDateTime: '2018-05-03 16:30',
        duration: '13h30m',
      }, {
        carrierCode: 'MU',
        flightNo: 'MU 747',
        departAirportCode: 'PVG',
        departTerminal: '1',
        departDateTime: '2018-05-04 12:10',
        arriveAirportCode: 'KIX',
        arriveTerminal: '1',
        arriveDateTime: '2018-05-04 15:40',
        duration: '2h30m',
        layover: '19h40m',
      },
    ],
  },
  returns: {
    1: [
      {
        carrierCode: 'MU',
        flightNo: 'MU 9822',
        departAirportCode: 'KIX',
        departTerminal: '1',
        departDateTime: '2018-05-11 19:30',
        arriveAirportCode: 'PVG',
        arriveTerminal: '1',
        arriveDateTime: '2018-05-11 21:15',
        duration: '2h45m',
      }, {
        carrierCode: 'MU',
        flightNo: 'MU 589',
        departAirportCode: 'PVG',
        departTerminal: '1',
        departDateTime: '2018-05-12 13:00',
        arriveAirportCode: 'SFO',
        arriveTerminal: '1',
        arriveDateTime: '2018-05-12 09:30',
        duration: '11h30m',
        layover: '15h45m',
      },
    ],
    2: [
      {
        carrierCode: 'MU',
        flightNo: 'MU 730',
        departAirportCode: 'KIX',
        departTerminal: '1',
        departDateTime: '2018-05-11 09:30',
        arriveAirportCode: 'PVG',
        arriveTerminal: '1',
        arriveDateTime: '2018-05-11 10:45',
        duration: '2h15m',
      }, {
        carrierCode: 'MU',
        flightNo: 'MU 589',
        departAirportCode: 'PVG',
        departTerminal: '1',
        departDateTime: '2018-05-11 13:00',
        arriveAirportCode: 'SFO',
        arriveTerminal: '1',
        arriveDateTime: '2018-05-11 09:30',
        duration: '11h30m',
        layover: '2h15m',
      },
    ],
    3: [
      {
        carrierCode: 'MU',
        flightNo: 'MU 748',
        departAirportCode: 'KIX',
        departTerminal: '1',
        departDateTime: '2018-05-11 16:55',
        arriveAirportCode: 'PVG',
        arriveTerminal: '',
        arriveDateTime: '2018-05-11 18:40',
        duration: '2h45m',
      }, {
        carrierCode: 'MU',
        flightNo: 'MU 748',
        departAirportCode: 'KIX',
        departTerminal: '1',
        departDateTime: '2018-05-11 21:05',
        arriveAirportCode: 'KMG',
        arriveTerminal: '',
        arriveDateTime: '2018-05-12 00:20',
        duration: '3h15m',
        layover: '2h25m',
      }, {
        carrierCode: 'MU',
        flightNo: 'MU 767',
        departAirportCode: 'KMG',
        departTerminal: '',
        departDateTime: '2018-05-12 08:45',
        arriveAirportCode: 'TAO',
        arriveTerminal: '',
        arriveDateTime: '2018-05-12 12:25',
        duration: '3h40m',
        layover: '8h25m',
      }, {
        carrierCode: 'MU',
        flightNo: 'MU 767',
        departAirportCode: 'TAO',
        departTerminal: '',
        departDateTime: '2018-05-12 14:15',
        arriveAirportCode: 'SFO',
        arriveTerminal: '1',
        arriveDateTime: '2018-05-12 11:10',
        duration: '11h55m',
        layover: '1h50m',
      },
    ],
  },
  baggageAllowances: {
    '1_1': {
      departing: '2pc 7kg',
      returning: '2pc 7kg',
    },
    '1_2': {
      departing: '2pc 7kg',
      returning: '2pc 7kg',
    },
    '1_3': {
      departing: '2pc 7kg',
      returning: '2pc 7kg',
    },
    '2_2': {
      departing: '2pc 7kg',
      returning: '2pc 7kg',
    },
    '2_3': {
      departing: '2pc 7kg',
      returning: '2pc 7kg',
    },
    '3_2': {
      departing: '2pc 7kg',
      returning: '2pc 7kg',
    },
    '3_3': {
      departing: '2pc 7kg',
      returning: '2pc 7kg',
    },
    '4_2': {
      departing: '2pc 7kg',
      returning: '2pc 7kg',
    },
    '4_3': {
      departing: '2pc 7kg',
      returning: '2pc 7kg',
    },
  },
  recommendations: {
    1: {
      price: '¥43,658',
      cancellationPolicy: 'Refundable',
      departureIds: ['1'],
      returnIds: ['1'],
      validReturnsByDeparture: {
        1: ['1'],
      },
      validDeparturesByReturn: {
        2: ['2'],
      },
    },
    2: {
      price: '¥49,583',
      cancellationPolicy: '',
      departureIds: ['1', '2', '3', '4'],
      returnIds: ['2', '3'],
      validReturnsByDeparture: {
        1: ['2', '3'],
        2: ['2', '3'],
        3: ['2', '3'],
        4: ['2', '3'],
      },
      validDeparturesByReturn: {
        2: ['1', '2', '3', '4'],
        3: ['1', '2', '3', '4'],
      },
    },
  },
};

class FlightSearchComponent extends React.Component {
  state = {
    selectedTab: 'results',
  };
  handleSelectTab = (selectedTab) => {
    this.setState({
      selectedTab,
    });
  }
  render() {
    const { searchIds, onSearch } = this.props;
    return (
      <div className="FlightSearch">
        <button onClick={() => onSearch('SEARCHID1', searchData2)}>
          SEARCH
        </button>
        {searchIds.map(id => (
          <Tabs
            key={id}
            value={this.state.selectedTab}
            onChange={this.handleSelectTab}
          >
            <Tab label="RESULTS" value="results">
              <RecList searchId={id} />
            </Tab>
            <Tab label="SUGGESTIONS" value="suggestions">
              <SuggestionList searchId={id} />
            </Tab>
          </Tabs>
        ))}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  searchIds: Object.keys(state.flightSearchResults),
});
const mapDispatchToProps = {
  onSearch: flightSearchResultAdded,
};
const FlightSearch = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlightSearchComponent);
export default FlightSearch;

FlightSearchComponent.propTypes = {
  searchIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSearch: PropTypes.func.isRequired,
};
