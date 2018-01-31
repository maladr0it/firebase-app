import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Inbox from './Inbox';
import FilteredList from './FilteredList';
import ChatControls from './ChatControls';

import './index.css';

const ChatListsPaneComponent = ({
  filters,
}) => {
  // TODO: this is hacks, type "NONE" to unmount the listeners
  const filteredLists = filters.map(filter => (
    <FilteredList
      key={filter}
      feedName={filter}
      tagName={filter}
    />
  ));
  return (
    <div className="ChatListsPane">
      <ChatControls />
      <div>INBOX</div>
      <Inbox feedName="inbox" />
      {filteredLists}
    </div>
  );
};
const mapStateToProps = state => ({
  filters: state.chatApp.filters,
});
const ChatListsPane = connect(
  mapStateToProps,
  null,
)(ChatListsPaneComponent);
export default ChatListsPane;

ChatListsPaneComponent.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
};
