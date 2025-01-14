import 'server-only';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '../../services/session';

/* use verifySession cached in Server Actions, Route Handlers: */
export const verifySession = cache(async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect('/login');
  }

  return session;
});

/* use getUser cached in Server Actions, Route Handlers: */
export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  // Get user ID from session and fetch data from database service(s)
});
