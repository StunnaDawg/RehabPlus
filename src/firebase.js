import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import { initializeApp } from "firebase/app"
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA5wxTvMSYWz1FSUA79Toqn_fJdisassHo",
  authDomain: "rehabplus-10ed8.firebaseapp.com",
  projectId: "rehabplus-10ed8",
  storageBucket: "rehabplus-10ed8.appspot.com",
  messagingSenderId: "666465816200",
  appId: "1:666465816200:web:437c1843ed02548b1d593d",
  measurementId: "G-QQW7J19Q18",
}

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const storage = getStorage(FIREBASE_APP)
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
export const db = getFirestore(FIREBASE_APP)
