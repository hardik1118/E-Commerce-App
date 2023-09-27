// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMIdF4fipHT1L_EnSpc_n0u4jt313EgCQ",
  authDomain: "e-commerce-32d53.firebaseapp.com",
  projectId: "e-commerce-32d53",
  storageBucket: "e-commerce-32d53.appspot.com",
  messagingSenderId: "323845948495",
  appId: "1:323845948495:web:edee177ead8fc4e6da563a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setUser(user);
        return user;
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const signUp = (email, password, displayName) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setUser(user);
        updateProfile(user, { displayName });
        return user;
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const signOutUser = () => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });

    return () => unsubscribe();
  });

  return { signIn, signOutUser, signUp, user };
}

export default AuthProvider;
