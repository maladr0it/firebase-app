import firebase from './firebase';

const auth = firebase.auth();

// plan: return the user's object
// use this object as the means to fetch chat data
// with a key?

// get user info from google
export const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

// export const createGoogleUser = async () => {
//   const
// };
