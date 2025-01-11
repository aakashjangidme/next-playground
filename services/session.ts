import 'server-only';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '@/lib/session.config';
import { defaultSession, SessionData } from '@/lib/session.types';
import logger from '@/utils/logger';

export async function getSession() {
  logger.debug('---getSession---');
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (!session.user) {
    session.user = defaultSession.user;
    session.expiresAt = defaultSession.expiresAt;
  }

  // lookup sessionObject in the database.

  return session;
}

export async function destroySession() {
  const session = await getSession();
  session.destroy();
}

export async function createSession(data: SessionData) {
  const session = await getSession();
  session.destroy();
  session.user = data.user;
  await session.save();
}

const SessionService = {
  getSession,
  destroySession,
  createSession,
};

export default SessionService;
