import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  listenForChatUpdates,
  listenForTaggedChats,
} from '../../actions';

import ChatList from './ChatList';
import ChatControls from './ChatControls';

import './index.css';

const ChatListPaneComponent = ({
  userId, feedListener, filterListener,
}) => (
  <div className="ChatListPane">
    <ChatControls />
    <ChatList
      listener={() => feedListener(userId, 'inbox')}
      feedName="inbox"
    />
    <ChatList
      listener={() => filterListener('hasAgent', 'hasAgent')}
      feedName="hasAgent"
    />
  </div>
);
const mapStateToProps = state => ({
  userId: state.user.userId,
});
const mapDispatchToProps = ({
  feedListener: listenForChatUpdates,
  filterListener: listenForTaggedChats,
});
const ChatListPane = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatListPaneComponent);
export default ChatListPane;

ChatListPaneComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  feedListener: PropTypes.func.isRequired,
  filterListener: PropTypes.func.isRequired,
};
