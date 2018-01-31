import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import {
  selectChat,
  listenToFilteredChats,
  filterRemoved,
} from '../../actions';

import ChatItem from './ChatItem';
import './index.css';

class FilteredListComponent extends React.Component {
  componentDidMount() {
    this.chatUnsubscribe = this.props.onListen(
      this.props.tagName,
      this.props.feedName,
    );
  }
  componentWillUnmount() {
    this.chatUnsubscribe();
  }
  render() {
    const {
      onSelectChat, onRemoveFilter,
      userId, chatIds, selectedChat, tagName,
    } = this.props;
    const chats = chatIds.map(chatId => (
      <ChatItem
        key={chatId}
        chatId={chatId}
        handleSelectChat={() => onSelectChat(userId, chatId)}
        isSelected={(chatId === selectedChat)}
      />
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
  }
}
const mapStateToProps = (state, ownProps) => ({
  userId: state.user.userId,
  selectedChat: state.chatApp.selectedChat,
  chatIds: state.chatApp.chatIdsByFeed[ownProps.feedName],
});
const mapDispatchToProps = {
  onRemoveFilter: filterRemoved,
  onSelectChat: selectChat,
  onListen: listenToFilteredChats,
};
const FilteredList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilteredListComponent);
export default FilteredList;

FilteredListComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  feedName: PropTypes.string.isRequired,
  selectedChat: PropTypes.string,
  chatIds: PropTypes.arrayOf(PropTypes.string),
  onRemoveFilter: PropTypes.func.isRequired,
  onSelectChat: PropTypes.func.isRequired,
  onListen: PropTypes.func.isRequired,
};
FilteredListComponent.defaultProps = {
  selectedChat: '',
  chatIds: [],
};
