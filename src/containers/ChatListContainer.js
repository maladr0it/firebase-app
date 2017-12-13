import { connect } from 'react-redux';
import {
  chatSelected,
  createChat,
  loggedIn
} from '../actions';
import ChatList from '../components/ChatList';

// TODO: consider naming
const mapStateToProps = state => ({
  chatIds: state.chatApp.chatIds,
  selectedChatId: state.chatApp.selectedChatId,
  currentUserId: state.user.userId,
});

const mapDispatchToProps = dispatch => ({
  onSelectChat: chatId => {
    dispatch(chatSelected(chatId));
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