import React from 'react';
import { connect } from 'react-redux';
import {
  listenForChatUpdates,
  selectChat
} from '../../actions';

import ChatItem from './ChatItem';
import './index.css';

const ChatListComponent = ({
  onSelectChat,
  userId, chatIds
}) => {
  const chats = chatIds.map(chatId => (
    <ChatItem key={chatId}
      handleSelectChat={() => onSelectChat(userId, chatId)}
      chatId={chatId}
    />
  ));
  return (
    <ul className='ChatList'>
      {chats}
    </ul>
  );
};
const mapStateToProps = state => ({
  userId: state.user.userId,
  chatIds: state.chatApp.chatIds,
});
const mapDispatchToProps = {
  chatListener: listenForChatUpdates,
  onSelectChat: selectChat
};
const withListener = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      listener: undefined
    };
    componentDidMount() {
      this.setState({
        chatUnsubscribe: this.props.chatListener(this.props.userId)
      });
    }
    componentWillUnmount() {
      console.log(`unsubscribing from ${this.props.userId}'s chats`);
      this.state.chatUnsubscribe();
    }
    render() {
      const { chatListener, ...passThroughProps } = this.props;
      return <WrappedComponent {...passThroughProps} />;
    }
  }
};
const ChatList = connect(
  mapStateToProps, mapDispatchToProps
)(withListener(ChatListComponent));

export default ChatList;