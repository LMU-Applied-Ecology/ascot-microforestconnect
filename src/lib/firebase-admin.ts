import { getApps, initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';

export function getAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }
  const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!key || !projectId) {
    throw new Error(
      'Missing FIREBASE_SERVICE_ACCOUNT_KEY or NEXT_PUBLIC_FIREBASE_PROJECT_ID. Add a service account JSON string to .env for server-side Firestore access.'
    );
  }
  const credential = cert(JSON.parse(key) as ServiceAccount);
  return initializeApp({ credential, projectId });
}
