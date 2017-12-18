import React from 'react';
import { connect } from 'react-redux';
import {
  listenForChatUpdates,
  selectChat
} from '../../actions';

import ChatItem from './ChatItem';

const ChatListComponent = ({
  onSelectChat,
  chatIds, chatsData
}) => {
  const chats = chatIds.map(chatId => (
    <ChatItem key={chatId}
      handleSelectChat={() => onSelectChat(chatId)}
      chatId={chatId}
      chatData={chatsData[chatId]}
    />
  ));
  return (
    <div>{chats}</div>
  );
};

const mapStateToProps = state => ({
  userId: state.user.userId,
  chatIds: state.chatApp.chatIds,
  chatsData: state.chats
  // passing all chats here, this could get big,
  // consider selector/reducer
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
        chatListener: this.props.chatListener(this.props.userId)
      });
    }
    componentWillUnmount() {
      // add destroy listener here
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