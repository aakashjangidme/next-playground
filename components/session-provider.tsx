'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultSession, SessionData } from '@/types/session';

interface SessionContextType {
  session: SessionData;
  loading: boolean;
  error: string | null;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

type SessionProviderProps = {
  children: React.ReactNode;
};

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState<SessionData>(defaultSession);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController instance
    const { signal } = controller;

    const fetchSessionData = async () => {
      try {
        const response = await fetch('/api/auth/session', { signal });
        if (!response.ok) {
          throw new Error('Failed to fetch session');
        }
        const data = (await response.json()) as SessionData;
        setSession(data);
      } catch (err) {
        if (signal.aborted) {
          console.log('Fetch aborted');
          return; // Exit early if fetch was aborted
        }
        setError('Failed to fetch session data');
      } finally {
        if (!signal.aborted) {
          setLoading(false); // Only update loading state if fetch wasn't aborted
        }
      }
    };

    fetchSessionData();

    return () => {
      controller.abort(); // Abort fetch on component unmount
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading, error }}>
      {children}
    </SessionContext.Provider>
  );
};
