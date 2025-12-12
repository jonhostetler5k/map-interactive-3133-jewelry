import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  return (
    <div className="prose prose-stone max-w-none pb-24">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="font-serif text-4xl text-brand-black font-semibold mt-12 mb-6 border-b-2 border-brand-gold pb-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="font-serif text-2xl text-brand-black font-semibold mt-10 mb-4" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="font-serif text-xl text-gray-800 font-semibold mt-8 mb-3" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="font-sans text-gray-700 leading-relaxed mb-4 text-lg" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-gray-700" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-outside ml-6 mb-4 space-y-2 text-gray-700" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="pl-1" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-brand-gold pl-4 italic text-gray-600 my-6 bg-gray-50 py-2 pr-2" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-bold text-brand-black" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full text-left text-sm whitespace-nowrap" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="font-semibold p-4 border-b border-gray-200 bg-gray-100" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="p-4 border-b border-gray-200" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-brand-gold hover:underline cursor-pointer" {...props} />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;