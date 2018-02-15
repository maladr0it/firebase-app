// handles the view state of each chat individually
// e.g. the scroll position of the messageList,
// selected user, reservation etc.

// example
// chatViews = {
//   chat1981041: {
//     // pertaining to the chat-window
//     scrollPos: 400,
//     atBottom: true,
//     draftText: '',

//     // pertaining to the customer-pane
//     paneViewType: 'user',
//     selectedUser: 'usr1908401',
//     selectedReservation: null,
//   },
// };
const defaultState = {};
const defaultChatView = {};

const chatViews = (state = defaultState, action) => {
  switch (action.type) {
    case 'SCROLL_POS_UPDATED': {
      const { chatId, scrollPos, atBottom } = action.payload;
      return {
        ...state,
        [chatId]: { ...state[chatId], scrollPos, atBottom },
      };
    }
    case 'DRAFT_TEXT_UPDATED': {
      const { chatId, text } = action.payload;
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          draftText: text,
        },
      };
    }
    case 'USER_SELECTED': {
      const { chatId, userId } = action.payload;
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          detailViewType: 'USER',
          selectedUserId: userId,
        },
      };
    }
    case 'RESERVATION_SELECTED': {
      const { chatId, reservationId } = action.payload;
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          detailViewType: 'RESERVATION',
          selectedReservationId: reservationId,
        },
      };
    }
    default:
      return state;
  }
};
export default chatViews;

export const getChatView = (state, chatId) => (
  state[chatId] || defaultChatView
);
