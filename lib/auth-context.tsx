'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { destroySessionAction, refreshSessionAction } from '@/app/actions/session';
import { onAuthStateChanged, onIdTokenChanged, User } from 'firebase/auth';
import logger from '@/utils/logger';
import { authService } from './firebase/auth-service';
import { auth } from './firebase/client';


// Enum for lifecycle statuses
enum AuthStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
}

// Define the shape of the AuthContext
interface AuthContextType {
  status: AuthStatus;
  user: User | null;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props for the AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// **AuthProvider** Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.IDLE);

  // Handle Firebase Auth state changes
  useEffect(() => {
    setStatus(AuthStatus.LOADING);
    logger.debug('auth-context:AuthProvider');

    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      logger.debug('auth-context:onIdTokenChanged');

      if (user) {
        try {
          logger.debug('auth-context:user.uid', user.uid);

          // Refresh session only if user is authenticated
          await refreshSessionAction({
            uid: user.uid,
            email: user.email ?? '',
            token: await user.getIdToken(),
          });

          setUser(user);
          setStatus(AuthStatus.AUTHENTICATED);
        } catch (error) {
          console.error('Error during session refresh:', error);
          await destroySessionAction();
          setUser(null);
          setStatus(AuthStatus.UNAUTHENTICATED);
        }
      } else {
        await destroySessionAction();
        setUser(null);
        setStatus(AuthStatus.UNAUTHENTICATED);
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle Google login
  const loginWithGoogle = async () => {
    logger.debug('auth-context:loginWithGoogle');

    setStatus(AuthStatus.LOADING);
    try {
      await authService.signInWithGoogle();
      // No direct `setUser` or `setStatus` here; rely on `onAuthStateChanged`

      setStatus(AuthStatus.AUTHENTICATED);
    } catch (error) {
      console.error('Google login error:', error);
      setStatus(AuthStatus.UNAUTHENTICATED);
    }
  };

  // Handle email/password login
  const loginWithEmailAndPassword = async (email: string, password: string) => {
    setStatus(AuthStatus.LOADING);
    try {
      await authService.signInWithEmailAndPassword(email, password);
      // No direct `setUser` or `setStatus` here; rely on `onAuthStateChanged`
      setStatus(AuthStatus.AUTHENTICATED);
    } catch (error) {
      console.error('Email/Password login error:', error);
      setStatus(AuthStatus.UNAUTHENTICATED);
      throw error;
    }
  };

  // Handle logout
  const logOut = async () => {
    setStatus(AuthStatus.LOADING);
    try {
      await authService.signOut();
      // No direct `setUser` or `setStatus` here; rely on `onAuthStateChanged`
      setStatus(AuthStatus.UNAUTHENTICATED);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      user,
      status,
      loginWithEmailAndPassword,
      loginWithGoogle,
      logOut,
    }),
    [user, status]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook for accessing AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};