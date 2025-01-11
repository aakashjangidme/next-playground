'use server';

import SessionService from '@/services/session';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { LoginFormSchema } from '@/lib/auth.schema';

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export async function loginAction(state: LoginFormState, formData: FormData) {
  const parse = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
    };
  }

  const data = parse.data;

  const user = {
    uid: '0',
    email: data.email,
  };

  await SessionService.createSession({ user });

  redirect('/dashboard');
}

export async function logoutAction() {
  await SessionService.destroySession();
  revalidatePath('/');
  redirect('/');
}

export async function getSessionAction() {
  return JSON.stringify(await SessionService.getSession());
}
