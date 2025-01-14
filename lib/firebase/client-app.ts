// firebase.ts
import { getAnalytics } from 'firebase/analytics';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup as firebaseSignInWithPopup,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithRedirect,
  getRedirectResult,
  signInWithPopup,
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

// Sign-in Functions (only for client-side)
const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  // const result = await getRedirectResult(auth);
  // if (!result) {
  //   throw new Error('No user found');
  // }
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
