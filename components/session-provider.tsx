'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultSession, SessionData } from '@/lib/session.types';

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
    const fetchSessionData = async () => {
      try {
        const response = await fetch('/api/session');
        if (!response.ok) {
          throw new Error('Failed to fetch session');
        }
        const data = (await response.json()) as SessionData;
        setSession(data);
      } catch (err) {
        setError('Failed to fetch session data');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading, error }}>
      {children}
    </SessionContext.Provider>
  );
};
