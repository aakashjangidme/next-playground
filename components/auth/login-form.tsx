'use client';

import { useActionState, useTransition } from 'react';
import {
  loginWithPasswordAction,
  loginWithGoogleAction,
} from '@/app/actions/auth';
import { OctagonAlert } from 'lucide-react';
import Form from 'next/form';
import { useAuth } from '@/lib/auth-context';
import { signInWithGoogle } from '@/lib/firebase/client-app';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '../ui/loading-spinner';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [state, action, pending] = useActionState(
    loginWithPasswordAction,
    undefined
  );

  const { signInWithGoogle, loading } = useAuth();

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to log in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Form action={action}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2"
                  disabled={pending}
                >
                  {pending && <LoadingSpinner type="bars" />}
                  <span>{pending ? 'Logging in...' : 'Login'}</span>
                </Button>
              </div>
            </Form>

            <Form action={signInWithGoogle} className="mt-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading && <LoadingSpinner type="bars" />}
                <span>
                  {loading
                    ? 'Logging in...'
                    : 'Login with Google'}
                </span>
              </Button>
            </Form>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
            {state?.errors && (
              <div
                className="mt-4 flex items-center gap-2 text-red-500"
                aria-live="polite"
                aria-atomic="true"
              >
                <OctagonAlert className="h-5 w-5" />
                <p className="text-sm">
                  {state.errors.email || state.errors.password}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
