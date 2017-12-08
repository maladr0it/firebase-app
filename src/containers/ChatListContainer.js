import { connect } from 'react-redux';
import {
  chatSelected,
  chatAdded
} from '../actions';
import ChatList from '../components/ChatList';

const mapStateToProps = state => ({
  selectedChatId: state.chatApp.selectedChatId,
  chatIds: state.chatApp.chatIds,
});

const mapDispatchToProps = dispatch => ({
  onSelectChat: chatId => {
    dispatch(chatSelected(chatId));
  },
  onNewChat: chatId => {
    dispatch(chatAdded(chatId));
  }
});

const ChatListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatList);

export default ChatListContainer;