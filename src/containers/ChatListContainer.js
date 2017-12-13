import { connect } from 'react-redux';
import {
  chatSelected,
  createChat,
  loggedIn
} from '../actions';
import ChatList from '../components/ChatList';

const mapStateToProps = state => ({
  currentUserId: state.user.userId,
  chatIds: state.chatApp.chatIds,
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