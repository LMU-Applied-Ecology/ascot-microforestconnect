import { getFirestore } from 'firebase-admin/firestore';
import { getAdminApp } from '@/lib/firebase-admin';
import type { Forest } from '@/lib/firebase';

function docToForest(id: string, data: Record<string, unknown>): Forest {
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
    private: data.private === true,
  };
}

export async function getForestsServer(): Promise<Forest[]> {
  const app = getAdminApp();
  const db = getFirestore(app);
  const snapshot = await db.collection('forests').get();
  return snapshot.docs
    .map((docSnap) => docToForest(docSnap.id, docSnap.data() as Record<string, unknown>))
    .filter((forest) => !forest.private);
}

export async function getForestById(id: string): Promise<Forest | null> {
  const app = getAdminApp();
  const db = getFirestore(app);
  const snapshot = await db.collection('forests').doc(id).get();
  if (!snapshot.exists) return null;
  return docToForest(snapshot.id, snapshot.data() as Record<string, unknown>);
}
