import 'server-only';
import { SessionOptions } from 'iron-session';
import { env } from '@/lib/env.mjs';

const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

export const sessionOptions: SessionOptions = {
  password: env.SESSION_SECRET,
  cookieName: env.SESSION_COOKIE_NAME,
  cookieOptions: {
    expires: expiresAt,
    sameSite: 'lax',
    httpOnly: true, // Make cookie accessible only via HTTP (not JavaScript)
    secure: process.env.NODE_ENV === 'production', // Set to true in production to use HTTPS
    maxAge: 60 * 60 * 24 * 7, // One week expiration
  },
};
