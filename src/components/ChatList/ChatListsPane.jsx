import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  filterRemoved,
} from '../../actions';
import Inbox from './Inbox';
import FilteredList from './FilteredList';
import ChatControls from './ChatControls';

import './index.css';

const ChatListsPaneComponent = ({
  filters, onFilterRemoved,
}) => {
  // TODO: this is hacks, type "NONE" to unmount the listeners
  const filteredLists = filters.map(filter => (
    <React.Fragment key={filter}>
      <button
        onClick={() => onFilterRemoved(filter)}
      >
        {filter}
      </button>
      <FilteredList feedName={filter} tagName={filter} />
    </React.Fragment>
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
const mapDispatchToProps = ({
  onFilterRemoved: filterRemoved,
});
const ChatListsPane = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatListsPaneComponent);
export default ChatListsPane;

ChatListsPaneComponent.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterRemoved: PropTypes.func.isRequired,
};
