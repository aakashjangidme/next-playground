import { NextRequest, NextResponse } from 'next/server';
import { env } from './lib/env.mjs';
import { getSession } from './services/session';

/**
 * Protected Routes that require authentication
 * @type {string[]}
 */
const protectedRoutes = ['/dashboard'];

/**
 * Public Routes that do not require authentication
 * @type {string[]}
 */
const publicRoutes = ['/login', '/signup', '/'];

/**
 * Middleware function to handle authentication checks
 * - Redirect unauthenticated users from protected routes to login
 * - Redirect authenticated users from public routes to the dashboard
 *
 * @param {NextRequest} req - Incoming request object
 * @returns {NextResponse} - The response to be sent to the client
 */
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = await getSession(); // Get the session data

  // Check if the requested route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  // Check if the requested route is public
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  const sessionIdToken = session?.user?.token;
  const sessionUserId = session?.user?.uid;

  // If the route is protected and there's no valid session, redirect to login
  if (isProtectedRoute && (!sessionUserId || !sessionIdToken)) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // If the route is public and the user is authenticated, redirect to the dashboard
  if (isPublicRoute && sessionIdToken) {
    // Verify the session token if the route is public
    const verified = await verifyIdTokenOnServer(sessionIdToken);

    // If verified, redirect authenticated users to the dashboard
    if (verified?.uid && !path.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }
  }

  // Continue processing if the user is allowed to access the route
  return NextResponse.next();
}

/**
 * Configuration for Next.js middleware to apply only to certain routes
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};

/**
 * Function to verify the ID token on the server by calling an API endpoint
 * @param {string} idToken - The ID token to verify
 * @returns {Promise<any>} - The response from the API verifying the token
 */
const verifyIdTokenOnServer = async (idToken: string) => {
  const response = await fetch(
    `${env.NEXT_PUBLIC_SITE_URL}/api/auth/verifyIdToken`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: idToken }),
    }
  );

  // Check if the response is successful
  if (response.ok) {
    return response.json(); // Return the decoded token or user data
  }
};
