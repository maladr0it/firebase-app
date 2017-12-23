import React from 'react';
import { connect } from 'react-redux';
import {
  listenToChatForMessages,
  listenToChatForUsers
} from '../../actions';

import './index.css';

const ChatItemComponent = ({ handleSelectChat,
  chatId, chatData, isSelected
}) => {
  const readStatus = (chatData.unreadCount) ? 'Unread' : 'Read';
  const selectedStatus = (isSelected) ? 'Selected' : ''
  const users = chatData.userIds.map(id => <span key={id}>{id} </span>)
  return (
    <li
      className={`ChatItem ${readStatus} ${selectedStatus}`}
      onClick={() => handleSelectChat()}
    >
      ID: {chatId} <br />
      USERS: {users} <br />
      UNREAD: {chatData.unreadCount}
    </li>
  );
};

const mapStateToProps = (state, ownProps) => ({
  chatData: state.chats[ownProps.chatId]
});
const mapDispatchToProps = {
  messageListener: listenToChatForMessages,
  userListener: listenToChatForUsers
};
const withListener = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      messageUnsubscribe: undefined,
      userUnsubscribe: undefined
    };
    componentDidMount() {
      this.setState({
        messageUnsubscribe: this.props.messageListener(this.props.chatId),
        userUnsubscribe: this.props.userListener(this.props.chatId)
      });
    }
    componentWillUnmount() {
      console.log(`unsubscribing from chat ${this.props.chatId}`);
      this.state.messageUnsubscribe();
      this.state.userUnsubscribe();
    }
    render() {
      const { onListen, ...passThroughProps } = this.props
      return <WrappedComponent {...passThroughProps} />;
    }
  }
};
const ChatContainer = connect(
  mapStateToProps, mapDispatchToProps
)(withListener(ChatItemComponent));

export default ChatContainer