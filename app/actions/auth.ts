'use server';

import SessionService from '@/services/session';
import { SessionData } from '@/types/session';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { LoginFormSchema } from '@/lib/schemas/auth';
import { authService } from './../../lib/firebase/auth-service';

export type LoginFormState =
  | {
      errors?: { email?: string[]; password?: string[] };
      message?: string;
    }
  | undefined;

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
    const user = await authService.signInWithEmailAndPassword(email, password);
    const session: SessionData = {
      user: {
        uid: user.uid,
        email: user.email ?? '',
        token: await user.getIdToken(),
      },
    };

    await SessionService.createSession(session);
    redirect('/dashboard');
  } catch (error) {
    return { errors: { email: ['Invalid credentials'] } };
  }
}

export async function logoutAction() {
  console.log('logoutAction');

  await authService.signOut();
  await SessionService.destroySession();

  revalidatePath('/');
  redirect('/');
}
