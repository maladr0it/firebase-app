import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AccountControls from './components/AccountControls';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import UserPane from './components/UserPane';

import ReservationViewer from './components/ReservationViewer';
import FlightSearch from './components/FlightSearch';

import './App.css';

const App = ({ currentUserId }) => {
  const isLoggedIn = Boolean(currentUserId);

  return (
    <div className="App">
      {/* <FlightSearch /> */}
      <AccountControls isLoggedIn={isLoggedIn} />
      {isLoggedIn && (
        // <ReservationViewer />
        <div className="ChatPaneContainer">
          <ChatList />
          <ChatWindow />
          <UserPane />
        </div>
      )}
    </div>
  );
};
const mapStateToProps = state => ({
  currentUserId: state.user.userId,
});
export default connect(mapStateToProps)(App);

App.propTypes = {
  currentUserId: PropTypes.string,
};
App.defaultProps = {
  currentUserId: undefined,
};
