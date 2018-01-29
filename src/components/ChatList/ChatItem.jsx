import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import {
  listenToChatForMessages,
  listenToChatForUsers,
  listenToChatForMeta,
} from '../../actions';
import { getChat } from '../../reducers/chats';

import './index.css';

class ChatItemComponent extends React.Component {
  componentDidMount() {
    this.chatMetaUnsubscribe = this.props.chatMetaListener(this.props.chatId);
    this.messageUnsubscribe = this.props.messageListener(
      this.props.chatId,
      this.props.userId,
    );
    this.userUnsubscribe = this.props.userListener(this.props.chatId);
  }
  componentWillUnmount() {
    // console.log('destroying listeners for', this.props.chatId);
    this.chatMetaUnsubscribe();
    this.messageUnsubscribe();
    this.userUnsubscribe();
  }
  messageUnsubscribe = undefined;
  userUnsubscribe = undefined;
  chatMetaUnsubscribe = undefined;

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
const mapStateToProps = (state, ownProps) => ({
  userId: state.user.userId,
  ...getChat(state.chats, ownProps.chatId),
});
const mapDispatchToProps = {
  chatMetaListener: listenToChatForMeta,
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
  chatMetaListener: PropTypes.func.isRequired,
  messageListener: PropTypes.func.isRequired,
  userListener: PropTypes.func.isRequired,
};
ChatItemComponent.defaultProps = {
  unreadCount: 0,
};
