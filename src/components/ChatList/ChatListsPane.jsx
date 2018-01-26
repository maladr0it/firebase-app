import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  listenToUserChats,
  listenToFilteredChats,
} from '../../actions';

import ChatList from './ChatList';
import ChatControls from './ChatControls';

import './index.css';

const ChatListsPaneComponent = ({
  userId, userChatListener, filteredChatListener,
}) => (
  <div className="ChatListsPane">
    <ChatControls />
    <ChatList
      listener={() => userChatListener(userId, 'inbox')}
      feedName="inbox"
    />
    <div>FILTERED LIST:</div>
    <ChatList
      listener={() => filteredChatListener('hasAgent', 'hasAgent')}
      feedName="hasAgent"
    />
  </div>
);
const mapStateToProps = state => ({
  userId: state.user.userId,
});
const mapDispatchToProps = ({
  userChatListener: listenToUserChats,
  filteredChatListener: listenToFilteredChats,
});
const ChatListsPane = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatListsPaneComponent);
export default ChatListsPane;

ChatListsPaneComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  userChatListener: PropTypes.func.isRequired,
  filteredChatListener: PropTypes.func.isRequired,
};
