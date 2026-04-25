import ReactMarkdown from 'react-markdown';
import { getAboutContent } from '@/lib/site-content-server';

export const dynamic = 'force-dynamic';

export default async function AboutUsPage() {
  const content = await getAboutContent();

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
