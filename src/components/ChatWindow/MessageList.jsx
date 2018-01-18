import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { List } from 'material-ui/List';
import {
  scrollPosUpdated,
} from '../../actions';

import Message from './Message';
import TypingIndicator from './TypingIndicator';
import './index.css';

class MessageListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.debouncedScroll = debounce((scrollPos) => {
      const { scrollHeight } = this.messageListElem;
      const { clientHeight } = this.messageListElem;
      const atBottom = (scrollHeight - scrollPos === clientHeight);
      this.props.updateScroll(this.props.chatId, scrollPos, atBottom);
    }, 100);
  }
  // bit hacky.
  // scrolls to bottom if flagged as atBottom
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
    this.debouncedScroll(e.target.scrollTop);
  }
  render() {
    const messages = this.props.messagesData.map(messageData => (
      <Message
        key={messageData.id} // not ideal key
        {...messageData}
      />
    ));
    const usersTyping = this.props.usersData.filter(userData => (
      // don't show your own typing indicator
      userData.id !== this.props.userId && userData.isTyping
    ));
    const typingIndicators = usersTyping.map(userData => (
      <TypingIndicator key={userData.id} author={userData.id} />
    ));
    return (
      <div
        className="MessageListContainer"
        ref={(el) => { this.messageListElem = el; }}
        onScroll={e => this.handleScroll(e)}
      >
        <List>
          {messages}
          {typingIndicators}
          <div ref={(el) => { this.bottomElement = el; }} />
        </List>
      </div>
    );
  }
}

// SELECTORS
// TODO: research correct selector practices
const selectChat = (state, chatId) => (
  state.chats[chatId] ||
    {
      messageIds: [],
      userIds: [],
      scrollPos: 0,
      atBottom: false,
    }
);
const getChatData = (state, chatId) => {
  const chat = selectChat(state, chatId);
  return {
    messagesData: chat.messageIds.map(id => ({ id, ...state.messages[id] })),
    usersData: chat.userIds.map(id => ({ id, ...chat.users[id] })),
    scrollPos: chat.scrollPos,
    atBottom: chat.atBottom,
  };
};
const mapStateToProps = (state, ownProps) => ({
  userId: state.user.userId,
  ...getChatData(state, ownProps.chatId),
});
const mapDispatchToProps = {
  updateScroll: scrollPosUpdated,
};
const MessageList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageListComponent);

export default MessageList;

MessageListComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  chatId: PropTypes.string.isRequired,
  messagesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  usersData: PropTypes.arrayOf(PropTypes.object).isRequired,
  scrollPos: PropTypes.number.isRequired,
  atBottom: PropTypes.bool.isRequired,
  updateScroll: PropTypes.func.isRequired,
};
