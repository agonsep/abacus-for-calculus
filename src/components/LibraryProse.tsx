import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function LibraryProse({ children }: { children: string }) {
  return (
    <div className="text-[15px] leading-7 text-slate-900">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="mt-12 font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h2 className="mt-12 font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-9 font-serif text-xl font-semibold text-slate-900">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-8 font-serif text-lg font-semibold text-slate-900">
              {children}
            </h4>
          ),
          p: ({ children }) => <p className="mt-5">{children}</p>,
          ul: ({ children }) => (
            <ul className="mt-5 list-disc space-y-2 pl-6 marker:text-slate-400">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-5 list-decimal space-y-2 pl-6 marker:text-slate-400">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-700 underline decoration-slate-400 underline-offset-4 transition-colors hover:text-blue-900"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l-2 border-slate-300 pl-5 italic text-slate-600">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-900">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="mt-6 overflow-x-auto rounded-xl bg-slate-100 p-4 font-mono text-sm text-slate-900">
              {children}
            </pre>
          ),
          hr: () => <hr className="my-10 border-slate-200" />,
          img: ({ src, alt }) => (
            <img
              src={typeof src === "string" ? src : undefined}
              alt={alt ?? ""}
              loading="lazy"
              className="mt-8 w-full rounded-xl border border-slate-200 shadow-xl"
            />
          ),
          table: ({ children }) => (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-slate-200 bg-slate-100 px-3 py-2 font-semibold text-slate-900">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-slate-200 px-3 py-2 align-top">{children}</td>
          ),
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
