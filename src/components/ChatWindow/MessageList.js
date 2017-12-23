import React from 'react';
import { connect } from 'react-redux';
import {
  scrollPosUpdated
} from '../../actions';

import Message from './Message';
import './index.css';

class MessageListComponent extends React.Component {
  scrollToBottom() {
    // this.bottomElement.scrollIntoView({ behaviour: 'smooth' })
    this.messageListElem.scrollTop = 400;
  };
  componentWillUpdate(nextProps) {
    // console.log('scrolling to bottom');
    // // check a prop to see if chat needs to be scrolled to bot
    // // scrollPos before, scrollPos after.
    // // if scrollPos now and scrollPos later are different,
    // // set scrollTop
    // this.scrollToBottom();
  }
  // this should be debounced
  handleScroll(e) {
    console.log(this.props);
    const scrollPos = e.target.scrollTop;
    this.props.handleScroll(this.props.chatId, scrollPos);
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
        <button onClick={() => this.scrollToBottom()}>TO BOT!</button>
        {messages}
        <div ref={el => { this.bottomElement = el }} />
      </ul>
    );
  }
};

// SELECTORS
// select message objs based on chat Id
const getMessages = (state, chatId) => {
  const chat = selectChat(state, chatId);
  return selectMessages(state, chat.messageIds);
};
const getScrollPos = (state, chatId) => {
  const chat = selectChat(state, chatId);
  return chat.scrollPos;
};
// helpers
// TODO: this is a little hacky and expensive
const selectChat = (state, chatId) => {
  return state.chats[chatId] || { messageIds: [], scrollPos: 0 }; // TODO: hax
};
const selectMessages = (state, messageIds) => {
  return messageIds.map(id => state.messages[id]);
};

const mapStateToProps = (state, ownProps) => ({
  messagesData: getMessages(state, ownProps.chatId),
  scrollPos: getScrollPos(state, ownProps.chatId)
});

const mapDispatchToProps = {
  handleScroll: scrollPosUpdated
};

const MessageList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageListComponent);

export default MessageList;