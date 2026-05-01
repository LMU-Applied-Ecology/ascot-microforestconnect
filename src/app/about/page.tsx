/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { getAboutContent, type AboutContent } from '@/lib/firebase';

export default function AboutUsPage() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAboutContent();
        setContent(data);
      } catch (err) {
        console.error('Failed to load About content:', err);
        setError('Failed to load About content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-[5vw]">
        <h1 className="my-6 text-4xl font-bold">About</h1>
        <p className="text-gray-500">Loading content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-[5vw]">
        <h1 className="my-6 text-4xl font-bold">About</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!content || content.sections.length === 0) {
    return (
      <div className="mx-[5vw]">
        <h1 className="my-6 text-4xl font-bold">About</h1>
        <p className="text-gray-500">Content coming soon.</p>
      </div>
    );
  }

  return (
    <div className="mx-[5vw] overflow-y-auto">
      <h1 className="my-6 text-4xl font-bold">{content.title}</h1>
      {content.sections.map((section, i) => (
        <div key={i} className="mb-8">
          <h2 className="mb-3 text-2xl font-semibold">{section.heading}</h2>
          <div className="prose max-w-none">
            <ReactMarkdown>{section.body}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}
