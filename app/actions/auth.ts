'use server';

import SessionService from '@/services/session';
import { SessionData } from '@/types/session';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
  signOut,
} from '@/lib/firebase/client-app';
import { LoginFormSchema } from '@/lib/schemas/auth';

export type LoginFormState =
  | {
      errors?: { email?: string[]; password?: string[] };
      message?: string;
    }
  | undefined;

async function createSessionForUser(user: any) {
  const session: SessionData = {
    user: {
      uid: user.uid,
      email: user.email,
      token: await user.getIdToken(),
    },
  };

  await SessionService.createSession(session);
}

export async function loginWithPasswordAction(
  state: LoginFormState,
  formData: FormData
) {
  console.log('loginWithPasswordAction');

  const parse = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parse.success) {
    return { errors: parse.error.flatten().fieldErrors };
  }

  const { email, password } = parse.data;

  try {
    const user = await signInWithEmailAndPassword(email, password);
    await createSessionForUser(user);
    redirect('/dashboard');
  } catch (error) {
    return { errors: { email: ['Invalid credentials'] } };
  }
}

export async function loginWithGoogleAction(user: any) {
  try {
    console.log('loginWithGoogleAction');
    const user = await signInWithGoogle();
    await createSessionForUser(user);
    redirect('/dashboard');
  } catch (error) {
    console.error('Google login failed:', error);
  }
}

export async function logoutAction() {
  await SessionService.destroySession();
  await signOut();
  revalidatePath('/');
  redirect('/');
}
