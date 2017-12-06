import * as db from '../api';

export const sendMessage = text => {
  return {
    type: 'SEND_MESSAGE',
    payload: { text }
  };
};

export const messageSendRequest = text => {
  return {
    type: 'MESSAGE_SEND_REQUEST',
    payload: { text }
  };
};

export const messageSent = () => {
  return {
    type: 'MESSAGE_SEND_SUCCESS'
  };
};

export const messageSendFailure = error => {
  return {
    type: 'MESSAGE_SEND_FAILURE',
    payload: { error }
  }
}

export const requestSendMessage = text => async dispatch => {
  dispatch(messageSendRequest(text));
  try {
    await db.createUser(text);
  }
  catch (e) {
    dispatch(messageSendFailure(e));
  }
  
  dispatch(messageSent());
};