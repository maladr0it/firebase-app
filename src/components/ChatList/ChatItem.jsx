import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import {
  listenToChatForMessages,
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
  }
  componentWillUnmount() {
    this.chatMetaUnsubscribe();
    this.messageUnsubscribe();
  }
  chatMetaUnsubscribe = undefined;
  messageUnsubscribe = undefined;

  render() {
    const {
      handleSelectChat,
      chatId, usersJoined, isSelected,
    } = this.props;
    const selectedStatus = (isSelected) ? 'Selected' : '';
    const userList = Object.keys(usersJoined).map(id => (
      <span key={id}>{id} </span>
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
const mapStateToProps = (state, ownProps) => ({
  userId: state.user.userId,
  ...getChat(state.chats, ownProps.chatId),
});
const mapDispatchToProps = {
  chatMetaListener: listenToChatForMeta,
  messageListener: listenToChatForMessages,
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
  usersJoined: PropTypes.objectOf(PropTypes.bool),
  chatMetaListener: PropTypes.func.isRequired,
  messageListener: PropTypes.func.isRequired,
};
ChatItemComponent.defaultProps = {
  usersJoined: {},
};
