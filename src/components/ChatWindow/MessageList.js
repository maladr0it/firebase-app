import React from 'react';
import { connect } from 'react-redux';
import {
  scrollPosUpdated
} from '../../actions';
import { debounce } from 'lodash';

import Message from './Message';
import './index.css';

class MessageListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.debouncedScroll = debounce(e => {
      const scrollPos = e.target.scrollTop;
      const scrollHeight = this.messageListElem.scrollHeight;
      const clientHeight = this.messageListElem.clientHeight;
      const atBottom = (scrollHeight - scrollPos === clientHeight);
      this.props.updateScroll(this.props.chatId, scrollPos, atBottom);
    }, 100);
  }
  // bit hacky.
  // scrolls to bottom if already at bottom
  componentDidUpdate(prevProps) {
    if (this.props.atBottom) {
      this.scrollToBottom();
    } else if (prevProps.chatId !== this.props.chatId) {
      this.messageListElem.scrollTop = this.props.scrollPos;
    }
  }
  scrollToBottom() {
    this.bottomElement.scrollIntoView();
  }
  handleScroll(e) {
    e.persist();
    this.debouncedScroll(e);
  }
  render() {
    const messages = this.props.messagesData.map((messageData, i) => (
      <Message
        key={i} // not ideal key
        { ...messageData }
      />
    ));
    return (
      <ul className='MessageList'
        ref={el => {this.messageListElem = el}}
        onScroll={e => this.handleScroll(e)}
      >
        {messages}
        <div ref={el => {this.bottomElement = el}} />
      </ul>
    );
  }
};

// SELECTORS
// select message objs based on chat Id
const getChatData = (state, chatId) => {
  const chat = selectChat(state, chatId);
  return {
    messagesData: selectMessages(state, chat.messageIds),
    scrollPos: chat.scrollPos,
    atBottom: chat.atBottom
  };
};
// helpers
// TODO: this is a little hacky and expensive
const selectChat = (state, chatId) => {
  return state.chats[chatId] || { messageIds: [], scrollPos: 0, atBottom: false };
};
const selectMessages = (state, messageIds) => {
  return messageIds.map(id => state.messages[id]);
};

const mapStateToProps = (state, ownProps) => (
  getChatData(state, ownProps.chatId)
);
const mapDispatchToProps = {
  updateScroll: scrollPosUpdated
};
const MessageList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageListComponent);

export default MessageList;