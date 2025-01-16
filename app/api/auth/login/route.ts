import 'server-only';
import SessionService from '@/services/session';
import { SessionData } from '@/types/session';
import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { idToken } = body;

  const verifiedToken = await verifyIdToken()(idToken);

  const session: SessionData = {
    user: {
      uid: verifiedToken.uid,
      email: verifiedToken.email,
      token: idToken,
    },
  };

  await SessionService.createSession(session);

  return NextResponse.json({ ...session });
}
