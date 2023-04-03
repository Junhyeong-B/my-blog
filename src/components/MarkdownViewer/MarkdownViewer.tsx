'use client';

import ReactMarkDown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
  content: string;
};

export default function MarkdownViewer({ content }: Props) {
  return (
    <ReactMarkDown
      className="prose lg:prose-xl"
      remarkPlugins={[remarkGfm]}
      components={{
        h1({ children, ...props }) {
          const title = Array.isArray(children) ? children.join('') : children;
          return (
            <h1 {...props} id={title}>
              {children}
            </h1>
          );
        },
        h2({ children, ...props }) {
          const title = Array.isArray(children) ? children.join('') : children;
          return (
            <h2 {...props} id={title}>
              {children}
            </h2>
          );
        },
        h3({ children, ...props }) {
          const title = Array.isArray(children) ? children.join('') : children;
          return (
            <h3 {...props} id={title}>
              {children}
            </h3>
          );
        },
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag="div"
              {...props}
              style={coldarkDark}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkDown>
  );
}
