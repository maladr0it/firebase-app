import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { List } from 'material-ui/List';
import {
  scrollPosUpdated,
} from '../../actions';
import { getChat, getUsers } from '../../reducers/chats';
import { getMessages } from '../../reducers/messages';


import Message from './Message';
import TypingIndicator from './TypingIndicator';
import './index.css';

class MessageListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.debouncedScroll = debounce((scrollPos) => {
      const { scrollHeight, clientHeight } = this.messageListElem;
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
    console.log(this.props);
    const messages = this.props.messages.map(message => (
      <Message
        key={message.id} // not ideal key
        {...message}
      />
    ));
    const usersTyping = this.props.users.filter(userData => (
      // don't show your own typing indicator
      userData.id !== this.props.userId && userData.isTyping
    ));
    const typingIndicators = usersTyping.map(user => (
      <TypingIndicator key={user.id} author={user.id} />
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
const mapStateToProps = (state, ownProps) => {
  const chatData = getChat(state.chats, ownProps.chatId);
  return {
    userId: state.user.userId,
    ...chatData,
    users: getUsers(state.chats, ownProps.chatId),
    messages: getMessages(state.messages, chatData.messageIds),
  };
};
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
  messages: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object),
  scrollPos: PropTypes.number.isRequired,
  atBottom: PropTypes.bool.isRequired,
  updateScroll: PropTypes.func.isRequired,
};
MessageListComponent.defaultProps = {
  messages: [],
  users: [],
};
