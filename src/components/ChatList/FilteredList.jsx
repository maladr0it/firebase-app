import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import {
  selectChat,
  listenToFilteredChats,
} from '../../actions';

import ChatItem from './ChatItem';
import './index.css';

class InboxComponent extends React.Component {
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
      onSelectChat, userId, chatIds, selectedChat,
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
      <List className="ChatList">
        {chats}
      </List>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  userId: state.user.userId,
  selectedChat: state.chatApp.selectedChat,
  chatIds: state.chatApp.chatIdsByFeed[ownProps.feedName],
});
const mapDispatchToProps = {
  onSelectChat: selectChat,
  onListen: listenToFilteredChats,
};
const Inbox = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InboxComponent);
export default Inbox;

InboxComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  feedName: PropTypes.string.isRequired,
  selectedChat: PropTypes.string,
  chatIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectChat: PropTypes.func.isRequired,
  onListen: PropTypes.func.isRequired,
};
InboxComponent.defaultProps = {
  selectedChat: '',
};
