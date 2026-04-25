import ReactMarkdown from 'react-markdown';
import { getFaqContent } from '@/lib/site-content-server';

export const dynamic = 'force-dynamic';

export default async function FaqPage() {
  const content = await getFaqContent();

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
            <div className="prose mt-3 max-w-none">
              <ReactMarkdown>{item.answer}</ReactMarkdown>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
