'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ForestDetail from '@/components/forest-detail';
import { getForestById, type Forest } from '@/lib/firebase';

function ForestDetailsContent() {
  const searchParams = useSearchParams();
  const forestId = searchParams.get('forestId');
  const [forest, setForest] = useState<Forest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadForest = async () => {
      if (!forestId) {
        setError('Missing forest ID.');
        setForest(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await getForestById(forestId);
        if (!data) {
          setError('Forest not found.');
          setForest(null);
          return;
        }
        setForest(data);
      } catch (err) {
        console.error('Failed to load forest:', err);
        setError('Failed to load forest details. Please try again later.');
        setForest(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadForest();
  }, [forestId]);

  if (isLoading) {
    return (
      <div className="my-[5vh] mx-[2vw] text-gray-600">
        Loading forest details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-[5vh] mx-[2vw] text-red-600">
        {error}
      </div>
    );
  }

  if (!forest) {
    return (
      <div className="my-[5vh] mx-[2vw] text-gray-500">
        Forest details are unavailable.
      </div>
    );
  }

  return (
    <div className="my-[5vh]">
      <ForestDetail forest={forest} />
    </div>
  );
}

export default function ForestPage() {
  return (
    <Suspense fallback={<div className="my-[5vh] mx-[2vw] text-gray-600">Loading forest details...</div>}>
      <ForestDetailsContent />
    </Suspense>
  );
}
