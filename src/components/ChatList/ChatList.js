import React from 'react';
import { connect } from 'react-redux';
import {
  listenForChatUpdates,
} from '../../actions';

import ChatItem from './ChatItem';

const ChatListComponent = ({ onSelectChat, chatIds, currentUserId }) => {
  const chats = chatIds.map(chatId => (
    <ChatItem key={chatId} chatId={chatId} />
  ));
  return (
    <div>{chats}</div>
  );
};

// TODO: look up best practices for selectors
const getChats = (state, chatIds) => {
  return chatIds.map(id => state.chats[id]);
};
// TODO: consider naming
const mapStateToProps = state => ({
  chatIds: state.chatApp.chatIds,
  chats: getChats(state, state.chatApp.chatIds),
});

const mapDispatchToProps = {
  chatListener: listenForChatUpdates,
}

const withListener = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      listener: undefined
    };
    componentDidMount() {
      console.log('mounted ');
      this.props.chatListener(this.props.currentUserId);
    }
    componentWillUnmount() {
      console.log('unmounting...');
    }
    render() {
      const { onListen, ...passThroughProps } = this.props;
      return <WrappedComponent {...passThroughProps} />;
    }
  }
};

const ChatList = connect(
  mapStateToProps, mapDispatchToProps
)(withListener(ChatListComponent));

export default ChatList;