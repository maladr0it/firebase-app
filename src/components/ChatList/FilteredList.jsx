import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import {
  selectChat,
  filterRemoved,
} from '../../actions';

import ChatItem from './ChatItem';
import './index.css';

const FilteredListComponent = ({
  onSelectChat, onRemoveFilter,
  userId, chatIds, selectedChat, tagName,
}) => {
  const chats = chatIds.map(chatId => (
    <React.Fragment key={chatId}>
      <ChatItem
        chatId={chatId}
        handleSelectChat={() => onSelectChat(userId, chatId)}
        isSelected={(chatId === selectedChat)}
      />
      <Divider />
    </React.Fragment>
  ));
  return (
    <React.Fragment>
      <Chip
        label={tagName}
        onRequestDelete={() => onRemoveFilter(tagName)}
      >
        {tagName}
      </Chip>
      <List className="ChatList">
        {chats}
      </List>
    </React.Fragment>
  );
};
const mapStateToProps = (state, ownProps) => ({
  userId: state.user.userId,
  selectedChat: state.chatApp.selectedChat,
  chatIds: state.chatApp.chatIdsByFeed[ownProps.feedName],
});
const mapDispatchToProps = {
  onRemoveFilter: filterRemoved,
  onSelectChat: selectChat,
};
const FilteredList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilteredListComponent);
export default FilteredList;

FilteredListComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  selectedChat: PropTypes.string,
  chatIds: PropTypes.arrayOf(PropTypes.string),
  onRemoveFilter: PropTypes.func.isRequired,
  onSelectChat: PropTypes.func.isRequired,
};
FilteredListComponent.defaultProps = {
  selectedChat: '',
  chatIds: [],
};
