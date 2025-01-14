// firebase.ts
import { getAnalytics } from 'firebase/analytics';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup as firebaseSignInWithPopup,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Analytics (only for client-side)
let analytics: ReturnType<typeof getAnalytics> | undefined;

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { auth, firestore, analytics };

// Sign-in Functions
const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await firebaseSignInWithPopup(auth, provider);

  const user = result.user;
  return user;
};

const signInWithEmailAndPassword = async (email: string, password: string) => {
  return (await firebaseSignInWithEmailAndPassword(auth, email, password)).user;
};

const signOut = async () => {
  await firebaseSignOut(auth);
};

export { signInWithGoogle, signInWithEmailAndPassword, signOut };
