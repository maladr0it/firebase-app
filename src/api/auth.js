import firebase from './firebase';

import loginResp from './mock/googleLoginResp.json';

const auth = firebase.auth();

// plan: return the user's object
// use this object as the means to fetch chat data
// with a key?

// get user info from google
export const loginWithGoogle = async () => {
  // const provider = new firebase.auth.GoogleAuthProvider();
  // const response = await auth.signInWithPopup(provider);

  // mock response
  const response = loginResp;
  const { uid: id, displayName, photoURL } = response.user;
  return {
    id,
    displayName,
    photoURL,
    isNewUser: response.additionalUserInfo.isNewUser,
    // mock as a new user
    // isNewUser: true,
  };
};

export const a = 5;
