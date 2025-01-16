import 'server-only';
import SessionService from '@/services/session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await SessionService.getSession();

  return NextResponse.json(session);
}
