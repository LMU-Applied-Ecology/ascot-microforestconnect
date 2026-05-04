'use client';

import { useEffect, useState } from 'react';
import { RichMarkdown } from '@/components/RichMarkdown';
import { getFaqContent, type FaqContent } from '@/lib/firebase';

export default function FaqPage() {
  const [content, setContent] = useState<FaqContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getFaqContent();
        setContent(data);
      } catch (err) {
        console.error('Failed to load FAQ content:', err);
        setError('Failed to load FAQ content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-[5vw]">
        <h1 className="my-6 text-4xl font-bold">FAQ</h1>
        <p className="text-gray-500">Loading content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-[5vw]">
        <h1 className="my-6 text-4xl font-bold">FAQ</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!content || content.items.length === 0) {
    return (
      <div className="mx-[5vw]">
        <h1 className="my-6 text-4xl font-bold">FAQ</h1>
        <p className="text-gray-500">Content coming soon.</p>
      </div>
    );
  }

  return (
    <div className="mx-[5vw] overflow-y-auto">
      <h1 className="my-6 text-4xl font-bold">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {content.items.map((item) => (
          <details key={item.id} className="rounded-lg border border-gray-200 p-4">
            <summary className="cursor-pointer text-lg font-medium">
              {item.question}
            </summary>
            <RichMarkdown className="mt-3 max-w-none text-foreground">
              {item.answer}
            </RichMarkdown>
          </details>
        ))}
      </div>
    </div>
  );
}
