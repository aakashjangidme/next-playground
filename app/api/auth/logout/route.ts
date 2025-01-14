import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken } from '@/lib/firebase/admin-app';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { token } = body;

  const verifiedToken = await verifyIdToken()(token);

  return NextResponse.json({ uid: verifiedToken.uid });
}
