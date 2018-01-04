import React from 'react';
import { connect } from 'react-redux';
import {
  listenToChatForMessages,
  listenToChatForUsers
} from '../../actions';

import { ListItem } from 'material-ui/List';
import './index.css';

const ChatItemComponent = ({ handleSelectChat,
  chatId, chatData, isSelected
}) => {
  const readStatus = (chatData.unreadCount) ? 'Unread' : '';
  const selectedStatus = (isSelected) ? 'Selected' : ''
  const users = chatData.userIds.map(id => <span key={id}>{id} </span>)
  return (
    <div className={`${readStatus} ${selectedStatus}`}>
      <ListItem
        primaryText={chatId}
        secondaryText={<p>{users} -- {chatData.undreadCount}</p>}
        onClick={() => handleSelectChat()}
      />
    </div>
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