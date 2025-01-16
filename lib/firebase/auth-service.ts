import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  User,
  setPersistence,
  browserSessionPersistence,
  signOut as _signOut,
} from 'firebase/auth';
import { auth } from './client';

type AuthStateCallback = (user: User | null) => void;

export const authService = {
  /**
   * Subscribe to authentication state changes.
   * @param callback Function to handle auth state changes.
   * @returns Unsubscribe function.
   */
  onAuthStateChanged: (callback: AuthStateCallback) => {
    console.log('auth-service:onAuthStateChanged');

    return _onAuthStateChanged(auth, callback);
  },

  /**
   * Sign in with Google.
   * @returns Authenticated User object.
   */
  signInWithGoogle: async (): Promise<User | null> => {
    console.log('auth-service:signInWithGoogle');

    const provider = new GoogleAuthProvider();
    try {
      // const result = await signInWithPopup(auth, provider);

      const result = await setPersistence(auth, browserSessionPersistence)
        .then(() => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return signInWithPopup(auth, provider);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });

      if (result) return result.user;
      return null;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  },

  /**
   * Sign in with email and password.
   * @param email User's email address.
   * @param password User's password.
   * @returns Authenticated User object.
   */
  signInWithEmailAndPassword: async (
    email: string,
    password: string
  ): Promise<User> => {
    console.log('auth-service:signInWithEmailAndPassword');

    try {
      const result = await _signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      console.error('Error signing in with email and password:', error);
      throw error; // Ensure the caller can handle the error
    }
  },

  /**
   * Sign out the current user.
   */
  signOut: async (): Promise<void> => {
    try {
      console.log('auth-service:signOut');
      await _signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },
};
