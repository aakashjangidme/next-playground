import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './services/session';

/**
 * Routes that require authentication to access
 * @type {string[]}
 */
const protectedRoutes = ['/dashboard'];

/**
 * Routes that do not require authentication
 * @type {string[]}
 */
const publicRoutes = ['/login', '/signup', '/'];

/**
 * Middleware function to protect routes based on session
 * - Redirects unauthenticated users to login for protected routes
 * - Redirects authenticated users to the dashboard for public routes
 *
 * @param {NextRequest} req - The incoming request object
 * @returns {NextResponse} - The response object to be sent to the client
 */
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Check if the requested route is protected or public
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  const session = await getSession();

  // Redirect unauthenticated users to login page for protected routes
  if (isProtectedRoute && !session?.user?.uid) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Redirect authenticated users to dashboard for public routes
  if (
    isPublicRoute &&
    session?.user?.uid &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

/**
 * Configuration for Next.js middleware
 * - Defines which routes the middleware should apply to
 */
export const config = {
  /**
   * A matcher function that excludes certain routes from the middleware
   * - Excludes API routes, static assets, and certain file types like images and favicons
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
