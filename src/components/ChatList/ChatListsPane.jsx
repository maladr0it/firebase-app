import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Inbox from './Inbox';
import FilteredList from './FilteredList';
import ChatControls from './ChatControls';

import './index.css';


// TODO: this is hacks, type "NONE" to unmount the listeners
const ChatListsPaneComponent = ({ filter }) => {
  const list = (filter === 'NONE') ? '' : <FilteredList feedName={filter} tagName={filter} />;
  return (
    <div className="ChatListsPane">
      <ChatControls />
      <Inbox feedName="inbox" />
      FILTER: {filter}
      {list}
    </div>
  );
};
const mapStateToProps = state => ({
  filter: state.chatApp.filter,
});
const ChatListsPane = connect(
  mapStateToProps,
  null,
)(ChatListsPaneComponent);
export default ChatListsPane;

ChatListsPaneComponent.propTypes = {
  filter: PropTypes.string,
};
ChatListsPaneComponent.defaultProps = {
  filter: 'hasAgent',
};
