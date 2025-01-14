import { env } from '../env.mjs';

const config = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const configType = typeof config;

// When deployed, there are quotes that need to be stripped
Object.keys(config).forEach((key) => {
  const configKey = key as keyof typeof config;
  const configValue = config[configKey] + '';
  if (configValue.charAt(0) === '"') {
    config[configKey] = configValue.substring(1, configValue.length - 1);
  }
});

export const firebaseConfig = config;
