'use client';

import { createContext, useContext, useEffect, useMemo, useState, ReactNode, FC } from 'react';
import { loginWithGoogleAction } from '@/app/actions/auth';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, signInWithEmailAndPassword, signInWithGoogle, signOut } from './firebase/client-app';


interface AuthContextType {
  loading: boolean;
  user: User | null;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<User>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const _signInWithGoogle = async () => {
    console.log('_signInWithGoogle');
    const _user = await signInWithGoogle();
    console.log('_user', _user);

    await loginWithGoogleAction(_user);
  };

  const value = useMemo(
    () => ({
      loading,
      user,
      signInWithEmailAndPassword,
      signInWithGoogle: _signInWithGoogle,
      signOut,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}