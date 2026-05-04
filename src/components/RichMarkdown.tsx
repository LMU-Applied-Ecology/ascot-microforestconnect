import ReactMarkdown from 'react-markdown';
import type { Components, Options } from 'react-markdown';

/* eslint-disable @typescript-eslint/no-unused-vars -- `node` is MDAST metadata from react-markdown and must not be forwarded to DOM elements */
export const richMarkdownComponents: Components = {
  p: ({ node, ...props }) => (
    <p {...props} className="mb-4 leading-relaxed last:mb-0" />
  ),
  a: ({ node, ...props }) => {
    const href = props.href;
    const external =
      typeof href === 'string' && /^https?:\/\//i.test(href);
    return (
      <a
        {...props}
        className="font-medium text-[#166534] underline decoration-2 underline-offset-[3px] transition-colors hover:text-[#14532d] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#226E18]"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      />
    );
  },
  strong: ({ node, ...props }) => (
    <strong {...props} className="font-semibold text-foreground" />
  ),
  em: ({ node, ...props }) => <em {...props} className="italic" />,
  ul: ({ node, ...props }) => (
    <ul
      {...props}
      className="my-3 list-disc pl-6 marker:text-emerald-900"
    />
  ),
  ol: ({ node, ...props }) => (
    <ol
      {...props}
      className="my-3 list-decimal pl-6 marker:font-semibold marker:text-emerald-900"
    />
  ),
  li: ({ node, ...props }) => (
    <li {...props} className="my-1 leading-relaxed" />
  ),
  code: ({ node, className, ...props }) => (
    <code
      {...props}
      className={
        className
          ? className
          : 'rounded bg-emerald-100/90 px-1.5 py-0.5 font-mono text-sm text-emerald-950'
      }
    />
  ),
  pre: ({ node, ...props }) => (
    <pre
      {...props}
      className="my-4 overflow-x-auto rounded-lg bg-emerald-950 p-4 font-mono text-sm text-emerald-50 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
    />
  ),
  blockquote: ({ node, ...props }) => (
    <blockquote
      {...props}
      className="my-4 border-l-4 border-emerald-400 pl-4 italic text-neutral-700"
    />
  ),
  h3: ({ node, ...props }) => (
    <h3 {...props} className="mt-6 mb-2 text-xl font-semibold" />
  ),
  h4: ({ node, ...props }) => (
    <h4 {...props} className="mt-4 mb-2 text-lg font-semibold" />
  ),
};
/* eslint-enable @typescript-eslint/no-unused-vars */

export type RichMarkdownProps = {
  children: string;
  /** Wrapper around rendered markdown; defaults to typographic shell */
  className?: string;
} & Omit<Options, 'children' | 'components'>;

const defaultWrapperClass = 'max-w-none text-foreground';

export function RichMarkdown({
  children,
  className,
  ...markdownOptions
}: RichMarkdownProps) {
  return (
    <div className={className ?? defaultWrapperClass}>
      <ReactMarkdown
        components={richMarkdownComponents}
        {...markdownOptions}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
