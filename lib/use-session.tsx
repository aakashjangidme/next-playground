// 'use client';

// import { useEffect, useState } from 'react';
// import { getSessionAction } from '@/app/actions/auth';
// import { defaultSession, SessionData } from './session.types';

// const fetchSession = async (): Promise<SessionData> => {
//   const response = await fetch('/api/session');
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

// export const useSession = () => {
//   const [session, setSession] = useState<SessionData>(defaultSession);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const getSession = async () => {
//       try {
//         // const sessionData = JSON.parse(await getSessionAction()) as SessionData;
//         // #TODO: check if this is the correct way to get the session data
//         const sessionData = await fetchSession();
//         setSession(sessionData);
//       } catch (err) {
//         setError('Failed to fetch session data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     getSession();
//   }, []);

//   return { session, loading, error };
// };
