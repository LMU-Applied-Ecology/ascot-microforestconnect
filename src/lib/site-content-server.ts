import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getAdminApp } from '@/lib/firebase-admin';

export type AboutSection = { heading: string; body: string };
export type AboutContent = {
  title: string;
  sections: AboutSection[];
  lastUpdatedAt: Timestamp | null;
  lastUpdatedBy: string;
};

export type FaqItem = { id: string; question: string; answer: string };
export type FaqContent = {
  items: FaqItem[];
  lastUpdatedAt: Timestamp | null;
  lastUpdatedBy: string;
};

export async function getAboutContent(): Promise<AboutContent | null> {
  const app = getAdminApp();
  const db = getFirestore(app);
  const doc = await db.collection('siteContent').doc('about').get();
  if (!doc.exists) return null;
  const data = doc.data() as Record<string, unknown>;
  return {
    title: (data.title as string) ?? '',
    sections: (data.sections as AboutSection[]) ?? [],
    lastUpdatedAt: (data.lastUpdatedAt as Timestamp) ?? null,
    lastUpdatedBy: (data.lastUpdatedBy as string) ?? '',
  };
}

export async function getFaqContent(): Promise<FaqContent | null> {
  const app = getAdminApp();
  const db = getFirestore(app);
  const doc = await db.collection('siteContent').doc('faq').get();
  if (!doc.exists) return null;
  const data = doc.data() as Record<string, unknown>;
  return {
    items: (data.items as FaqItem[]) ?? [],
    lastUpdatedAt: (data.lastUpdatedAt as Timestamp) ?? null,
    lastUpdatedBy: (data.lastUpdatedBy as string) ?? '',
  };
}
