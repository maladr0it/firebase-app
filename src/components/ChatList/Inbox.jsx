import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { selectInboxChat } from '../../actions';

import ChatItem from './ChatItem';
import './index.css';

const InboxComponent = ({
  onSelectChat, userId, chatIds, selectedChat,
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
    <List className="ChatList">
      {chats}
    </List>
  );
};
const mapStateToProps = (state, ownProps) => ({
  userId: state.user.userId,
  selectedChat: state.chatApp.selectedChat,
  chatIds: state.chatApp.chatIdsByFeed[ownProps.feedName],
});
const mapDispatchToProps = {
  onSelectChat: selectInboxChat,
};
const Inbox = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InboxComponent);
export default Inbox;

InboxComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  selectedChat: PropTypes.string,
  chatIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectChat: PropTypes.func.isRequired,
};
InboxComponent.defaultProps = {
  selectedChat: '',
};
