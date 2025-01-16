'use server';

import SessionService from '@/services/session';
import { SessionData } from '@/types/session';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type RefreshSessionProps = {
  uid: string;
  email: string;
  token: string;
};

export async function refreshSessionAction({
  uid,
  email,
  token,
}: RefreshSessionProps) {
  console.log('refreshSessionAction');
  const session: SessionData = {
    user: {
      uid: uid,
      email: email,
      token: token,
    },
  };

  await SessionService.destroySession();

  await SessionService.createSession(session);

  revalidatePath('/');
}

export async function destroySessionAction() {
  console.log('destroySessionAction');

  await SessionService.destroySession();

  revalidatePath('/');
}
