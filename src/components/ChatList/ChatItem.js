import React from 'react';
import { connect } from 'react-redux';
import {
  listenToChatForNewMessages,
  listenToChatForNewUsers
} from '../../actions';

const ChatItemComponent = ({ chatId, onSelectChat }) => {
  return (
    <li>CHAT: {chatId}</li>
  );
}

const mapDispatchToProps = {
  messageListener: listenToChatForNewMessages,
  userListener: listenToChatForNewUsers
};

const withListener = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      messageListenerId: undefined,
      userListenerId: undefined
    };
    componentDidMount() {
      this.props.messageListener(this.props.chatId);
      this.props.userListener(this.props.chatId)
    }
    componentWillUnmount() {
      console.log('unmounting...');
    }
    render() {
      const { onListen, ...passThroughProps } = this.props
      return <WrappedComponent {...passThroughProps} />;
    }
  }
};

const ChatContainer = connect(
  null, mapDispatchToProps
)(withListener(ChatItemComponent));

export default ChatContainer