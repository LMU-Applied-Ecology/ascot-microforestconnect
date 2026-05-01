import { initializeApp, getApps, getApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';

export type Forest = {
  id: string;
  address: string;
  blurb: string;
  coordinates: { lat: number; lng: number };
  city: string;
  estYear: number;
  forestName: string;
  sqft: number;
};

export type AboutSection = { heading: string; body: string };
export type AboutContent = {
  title: string;
  sections: AboutSection[];
};

export type FaqItem = { id: string; question: string; answer: string };
export type FaqContent = {
  items: FaqItem[];
};

/** Firestore document ID (e.g. ascotHills, allSouls) — used in `/forest/[forestId]`. */
export function forestDetailPath(forestDocumentId: string): string {
  return `/forest?forestId=${encodeURIComponent(forestDocumentId)}`;
}

function getFirebaseConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
}

function getClientDb() {
  const config = getFirebaseConfig();
  const app = getApps().length ? getApp() : initializeApp(config);
  return getFirestore(app);
}

function normalizeForest(id: string, data: Record<string, unknown>): Forest {
  const coords = (data.coordinates as Record<string, number>) ?? {};
  return {
    id,
    address: (data.address as string) ?? '',
    blurb: (data.blurb as string) ?? '',
    coordinates: { lat: Number(coords.lat), lng: Number(coords.lng) },
    city: (data.city as string) ?? '',
    estYear: Number(data.estYear) || 0,
    forestName: (data.forestName as string) ?? '',
    sqft: Number(data.sqft) || 0,
  };
}

export async function getForests(): Promise<Forest[]> {
  const db = getClientDb();
  const snapshot = await getDocs(collection(db, 'forests'));
  return snapshot.docs.map((snapshotDoc) =>
    normalizeForest(snapshotDoc.id, snapshotDoc.data() as Record<string, unknown>)
  );
}

export async function getForestById(id: string): Promise<Forest | null> {
  const db = getClientDb();
  const snapshot = await getDoc(doc(db, 'forests', id));
  if (!snapshot.exists()) return null;
  return normalizeForest(snapshot.id, snapshot.data() as Record<string, unknown>);
}

export async function getAboutContent(): Promise<AboutContent | null> {
  const db = getClientDb();
  const snapshot = await getDoc(doc(db, 'siteContent', 'about'));
  if (!snapshot.exists()) return null;
  const data = snapshot.data() as Record<string, unknown>;
  return {
    title: (data.title as string) ?? '',
    sections: (data.sections as AboutSection[]) ?? [],
  };
}

export async function getFaqContent(): Promise<FaqContent | null> {
  const db = getClientDb();
  const snapshot = await getDoc(doc(db, 'siteContent', 'faq'));
  if (!snapshot.exists()) return null;
  const data = snapshot.data() as Record<string, unknown>;
  return {
    items: (data.items as FaqItem[]) ?? [],
  };
}
