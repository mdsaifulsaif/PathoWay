import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Children } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/Firebase";

function AuthContextProvider({ children }) {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   login user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUSer) => {
      setUser(currentUSer);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const updateUser = (userinfo) => {
    return updateProfile(auth.currentUser, userinfo);
  };

  //google login
  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  const logoutUser = () => {
    return signOut(auth);
  };

  const userData = {
    user,
    setUser,
    loading,
    createUser,
    loginUser,
    updateUser,
    logoutUser,
    googleLogin,
  };
  return <AuthContext value={userData}>{children}</AuthContext>;
}

export default AuthContextProvider;
