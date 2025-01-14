import 'server-only';
import SessionService from '@/services/session';
import { NextRequest, NextResponse } from 'next/server';
import logger from '@/utils/logger';

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await SessionService.getSession();

  logger.debug('GET.session-->', session);
  return NextResponse.json(session);
}
