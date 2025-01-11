'use client';

import { useActionState } from 'react';
import { loginAction } from '@/app/actions/auth';
import { OctagonAlert } from 'lucide-react';
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
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
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

                <Input name="password" id="password" type="password" required />
              </div>
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2"
                aria-disabled={pending}
                disabled={pending}
              >
                {pending && (
                  <span className="inline-flex">
                    <LoadingSpinner type="bars" />
                  </span>
                )}
                <span>{pending ? 'Logging in...' : 'Login'}</span>
              </Button>
              <Button
                variant="outline"
                className="w-full"
                aria-disabled={pending}
              >
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>

            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {state?.errors && (
                <>
                  <OctagonAlert className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">
                    {state.errors.email || state.errors.password}
                  </p>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
