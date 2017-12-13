import { connect } from 'react-redux';
import {
  selectChat,
  createChat,
  loggedIn
} from '../actions';
import ChatList from '../components/ChatList';

// TODO: look up best practices for selectors
const getChats = (state, chatIds) => {
  return chatIds.map(id => state.chats[id]);
};
// TODO: consider naming
const mapStateToProps = state => ({
  chatIds: state.chatApp.chatIds,
  chats: getChats(state, state.chatApp.chatIds),
  selectedChatId: state.chatApp.selectedChatId,
  currentUserId: state.user.userId,
});

const mapDispatchToProps = dispatch => ({
  onSelectChat: (userId, chatId) => {
    dispatch(selectChat(userId, chatId));
  },
  onNewChat: userId => {
    dispatch(createChat(userId));
  }
});

const ChatListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatList);

export default ChatListContainer;