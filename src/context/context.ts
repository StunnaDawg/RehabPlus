import React, {createContext, useState, useEffect} from 'react'
import { FIREBASE_AUTH } from '../firebase';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
  
    useEffect(() => {
      const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(user => {
        setIsSignedIn(!!user);
      });
      return unsubscribe;
    }, []);
  
    return (
      <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
        {children}
      </AuthContext.Provider>
    );
  };