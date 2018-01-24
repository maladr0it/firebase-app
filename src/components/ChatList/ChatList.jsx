import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import {
  listenForChatUpdates,
  selectChat,
} from '../../actions';

import ChatItem from './ChatItem';
import './index.css';

class ChatListComponent extends React.Component {
  componentDidMount() {
    this.chatUnsubscribe = this.props.chatListener(this.props.userId);
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
const mapStateToProps = state => ({
  userId: state.user.userId,
  selectedChat: state.chatApp.selectedChat,
  chatIds: state.chatApp.chatIds,
});
const mapDispatchToProps = {
  chatListener: listenForChatUpdates,
  onSelectChat: selectChat,
};
const ChatList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatListComponent);

export default ChatList;

ChatListComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  selectedChat: PropTypes.string,
  chatIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  chatListener: PropTypes.func.isRequired,
  onSelectChat: PropTypes.func.isRequired,
};
ChatListComponent.defaultProps = {
  selectedChat: '',
};
