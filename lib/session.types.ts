export interface SessionData {
  user?: {
    uid: string;
    email: string;
  } | null;
  expiresAt?: null;
}

export const defaultSession: SessionData = {
  user: null,
  expiresAt: null,
};
