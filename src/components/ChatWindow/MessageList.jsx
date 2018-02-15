import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { List } from 'material-ui/List';
import {
  scrollPosUpdated,
} from '../../actions';
import { getChat } from '../../reducers/chats';
import { getChatView } from '../../reducers/chatViews';
import { getMessages } from '../../reducers/messages';

import Message from './Message';
// import TypingIndicator from './TypingIndicator';
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
  // TODO: this component is updating far too often
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
    const messages = this.props.messages.map(message => (
      <Message
        key={message.id} // not ideal key
        {...message}
      />
    ));
    return (
      <div
        className="MessageListContainer"
        ref={(el) => { this.messageListElem = el; }}
        onScroll={e => this.handleScroll(e)}
      >
        <List>
          {messages}
          <div ref={(el) => { this.bottomElement = el; }} />
        </List>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { messageIds } = getChat(state.chats, ownProps.chatId);
  const { scrollPos, atBottom } = getChatView(state.chatViews, ownProps.chatId);
  return {
    userId: state.user.userId,
    scrollPos,
    atBottom,
    messages: getMessages(state.messages, messageIds),
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
  scrollPos: PropTypes.number,
  atBottom: PropTypes.bool,
  updateScroll: PropTypes.func.isRequired,
};
MessageListComponent.defaultProps = {
  messages: [],
  users: [],
  atBottom: true,
  scrollPos: 0,
};
