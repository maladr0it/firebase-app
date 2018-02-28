import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import {
  listenToChatForMessages,
  listenToChatForMeta,
  listenToChatForUsers,
} from '../../actions';
import { getJoinedUserIds } from '../../reducers/chats';
import { getUsers } from '../../reducers/users';

import './index.css';

class ChatItemComponent extends React.Component {
  componentDidMount() {
    // this.chatMetaUnsubscribe = this.props.chatMetaListener(this.props.chatId);
    // this.messageUnsubscribe = this.props.messageListener(
    //   this.props.chatId,
    //   this.props.userId,
    // );
    // this.userUnsubscribe = this.props.userListener(this.props.chatId);
  }
  componentWillUnmount() {
    // this.chatMetaUnsubscribe();
    // this.messageUnsubscribe();
  }
  chatMetaUnsubscribe = undefined;
  messageUnsubscribe = undefined;

  render() {
    const {
      handleSelectChat,
      chatId, users, isSelected,
    } = this.props;
    const selectedStatus = (isSelected) ? 'Selected' : '';
    const userList = users.map(user => (
      <span key={user.id}>{user.username} </span>
    ));
    return (
      // HAX: List within a containing div to override MUI's backgroundColor
      <div className={`${selectedStatus}`}>
        <ListItem
          primaryText={userList}
          secondaryText={<p>{chatId}</p>}
          onClick={() => handleSelectChat()}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const userIds = getJoinedUserIds(state.chats, ownProps.chatId);
  return {
    userId: state.user.userId,
    users: getUsers(state.users, userIds),
  };
};
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
  users: PropTypes.arrayOf(PropTypes.object),
  chatMetaListener: PropTypes.func.isRequired,
  messageListener: PropTypes.func.isRequired,
  userListener: PropTypes.func.isRequired,
};
ChatItemComponent.defaultProps = {
  users: [],
};
