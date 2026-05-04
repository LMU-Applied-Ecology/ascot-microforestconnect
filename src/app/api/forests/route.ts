import { NextResponse } from 'next/server';
import { getForestsServer } from '@/lib/forests-server';

/** Required for `output: "export"` — response is fixed at build time from Firestore. */
export const dynamic = 'force-static';

export async function GET() {
  try {
    const forests = await getForestsServer();
    return NextResponse.json(forests);
  } catch (err) {
    console.error('Failed to load forests:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to load forests' },
      { status: 500 }
    );
  }
}
