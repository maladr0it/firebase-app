import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import {
  listenToChatForMessages,
  listenToChatForUsers,
} from '../../actions';
import './index.css';

class ChatItemComponent extends React.Component {
  componentDidMount() {
    this.messageUnsubscribe = this.props.messageListener(
      this.props.chatId,
      this.props.userId,
    );
    this.userUnsubscribe = this.props.userListener(this.props.chatId);
  }
  componentWillUnmount() {
    console.log('destroying listeners for', this.props.chatId);
    this.messageUnsubscribe();
    this.userUnsubscribe();
  }
  messageUnsubscribe = undefined;
  userUnsubscribe = undefined;

  render() {
    const {
      handleSelectChat,
      chatId, userIds, unreadCount, isSelected,
    } = this.props;
    const readStatus = (unreadCount) ? 'Unread' : '';
    const selectedStatus = (isSelected) ? 'Selected' : '';
    const users = userIds.map(id => <span key={id}>{id} </span>);
    return (
      // HAX: List within a containing div to override MUI's backgroundColor
      <div className={`${readStatus} ${selectedStatus}`}>
        <ListItem
          primaryText={chatId}
          secondaryText={<p>{users} -- {unreadCount}</p>}
          onClick={() => handleSelectChat()}
        />
      </div>
    );
  }
}
const getChatData = (state, chatId) => {
  const chatData = state.chats[chatId];
  return {
    userIds: chatData.userIds,
    unreadCount: chatData.unreadCount,
  };
};
const mapStateToProps = (state, ownProps) => ({
  userId: state.user.userId,
  ...getChatData(state, ownProps.chatId),
});
const mapDispatchToProps = {
  messageListener: listenToChatForMessages,
  userListener: listenToChatForUsers,
};
const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatItemComponent);

export default ChatContainer;

ChatItemComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  chatId: PropTypes.string.isRequired,
  handleSelectChat: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  userIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  unreadCount: PropTypes.number,
  messageListener: PropTypes.func.isRequired,
  userListener: PropTypes.func.isRequired,
};
ChatItemComponent.defaultProps = {
  unreadCount: 0,
};
