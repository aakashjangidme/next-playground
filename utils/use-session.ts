import { defaultSession, SessionData } from '@/types/session';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const sessionApiRoute = '/api/auth/session'; // Ensure this is the correct route
const loginRoute = '/api/auth/login';
const logoutRoute = '/api/auth/logout';

/**
 * Fetches JSON data from a given endpoint.
 * @template JSON
 * @param input - The request URL or Request object.
 * @param init - Optional request initialization parameters.
 * @returns A promise resolving to the parsed JSON data.
 */
async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  return fetch(input, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    ...init,
  }).then((res) => res.json());
}

/**
 * Handles login by sending a POST request with the username.
 * @param url - The login endpoint URL.
 * @param param - The login argument (username).
 * @returns The updated session data.
 */
async function doLogin(url: string, { arg }: { arg: string }) {
  return fetchJson<SessionData>(url, {
    method: 'POST',
    body: JSON.stringify({ idToken: arg }),
  });
}

/**
 * Handles logout by sending a DELETE request.
 * @param url - The logout endpoint URL.
 * @returns The updated session data.
 */
async function doLogout(url: string) {
  return fetchJson<SessionData>(url, {
    method: 'DELETE',
  });
}

/**
 * Custom hook to manage session state.
 * - Fetches the current session.
 * - Provides login and logout functionality.
 */
export default function useSession() {
  const {
    data: session,
    isLoading,
    // mutate,
  } = useSWR(sessionApiRoute, fetchJson<SessionData>, {
    fallbackData: defaultSession,
  });

  const { trigger: login } = useSWRMutation(loginRoute, doLogin, {
    revalidate: false,
    // onSuccess: (data) => {
    //   // Update session after login
    //   mutate(data, false); // Optimistic update without revalidation
    // },
  });

  const { trigger: logout } = useSWRMutation(logoutRoute, doLogout, {
    // onSuccess: () => {
    //   // Clear session after logout
    //   mutate(defaultSession, false);
    // },
  });

  return { session, login, logout, isLoading };
}
