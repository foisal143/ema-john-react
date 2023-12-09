import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
export const ContextUser = createContext(null);
const UserContext = ({ children }) => {
  const auth = getAuth(app);
  const googleProvaider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  // login in with google
  const loginGoogle = () => {
    return signInWithPopup(auth, googleProvaider);
  };
  // create user  with email password
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // login wtih email password
  const loginEmailPass = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // sign out section
  const logOut = () => {
    return signOut(auth);
  };
  // observer for user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  const authInfo = {
    user,
    loginGoogle,
    createUser,
    loginEmailPass,
    logOut,
  };
  return (
    <ContextUser.Provider value={authInfo}>{children}</ContextUser.Provider>
  );
};

export default UserContext;
