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
    // TODO: don't use setState in CDM
    this.messageUnsubscribe = this.props.messageListener(this.props.chatId);
    this.userUnsubscribe = this.props.userListener(this.props.chatId);
  }
  componentWillUnmount() {
    this.messageUnsubscribe();
    this.userUnsubscribe();
  }
  messageUnsubscribe = undefined;
  userUnsubscribe = undefined;

  render() {
    const {
      handleSelectChat, chatId, userIds, unreadCount, isSelected,
    } = this.props;
    const readStatus = (unreadCount) ? 'Unread' : '';
    const selectedStatus = (isSelected) ? 'Selected' : '';
    const users = userIds.map(id => <span key={id}>{id} </span>)
    return (
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
  chatId: PropTypes.string.isRequired,
  handleSelectChat: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  userIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  unreadCount: PropTypes.number.isRequired,
  messageListener: PropTypes.func.isRequired,
  userListener: PropTypes.func.isRequired,
};
