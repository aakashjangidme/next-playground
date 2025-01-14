import 'server-only';
import admin from 'firebase-admin';
import { env } from '@/lib/env.mjs';

interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
}

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, '\n');
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  const privateKey = formatPrivateKey(params.privateKey);

  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey,
  });

  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  });
}

export async function initAdmin() {
  const params = {
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    privateKey: env.FIREBASE_PRIVATE_KEY,
  };

  return createFirebaseAdminApp(params);
}

export const verifyIdToken = () => {
  return async (token: string) => {
    const app = await initAdmin();
    return await app.auth().verifyIdToken(token);
  };
};
