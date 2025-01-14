import 'server-only';
import { sessionOptions } from '@/config/session';
import { defaultSession, SessionData } from '@/types/session';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import logger from '@/utils/logger';

export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (!session.user) {
    session.user = defaultSession.user;
    session.expiresAt = defaultSession.expiresAt;
  }

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
