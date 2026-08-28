import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getAdjacentEntries, getLibraryEntry } from "@/content/library";
import { LibraryProse } from "@/components/LibraryProse";

export const Route = createFileRoute("/library/$slug")({
  loader: ({ params }) => {
    const entry = getLibraryEntry(params.slug);
    if (!entry) throw notFound();
    return { entry, ...getAdjacentEntries(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Unavailable — The Calculus Abacus" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { title, summary } = loaderData.entry;
    const description = summary || `${title} — from the Calculus Abacus library.`;
    return {
      meta: [
        { title: `${title} — The Calculus Abacus` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: EntryNotFound,
  component: LibraryEntryPage,
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen px-6 py-14" style={{ backgroundColor: "#141c33" }}>
      <div className="mx-auto w-full max-w-2xl">{children}</div>
    </main>
  );
}

function EntryNotFound() {
  return (
    <Shell>
      <Link
        to="/library"
        className="text-xs tracking-wide text-slate-400 transition-colors hover:text-slate-200"
      >
        ← About the Calculus Abacus
      </Link>
      <h1 className="mt-16 font-serif text-3xl font-bold" style={{ color: "#f5e8c8" }}>
        Page not found
      </h1>
      <p className="mt-4 text-sm text-slate-400">
        That article or exercise does not exist yet.
      </p>
    </Shell>
  );
}

function LibraryEntryPage() {
  const { entry, previous, next } = Route.useLoaderData();

  return (
    <Shell>
      <Link
        to="/library"
        className="text-xs tracking-wide text-slate-400 transition-colors hover:text-slate-200"
      >
        ← About the Calculus Abacus
      </Link>

      <article className="mt-10">
        <h1
          className="font-serif text-3xl font-bold leading-tight sm:text-4xl"
          style={{ color: "#f5e8c8" }}
        >
          {entry.title}
        </h1>
        {entry.summary ? (
          <p className="mt-3 text-sm text-slate-400">{entry.summary}</p>
        ) : null}

        <div className="mt-8">
          <LibraryProse>{entry.body}</LibraryProse>
        </div>
      </article>

      {(previous || next) && (
        <nav className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          {previous ? (
            <Link
              to="/library/$slug"
              params={{ slug: previous.slug }}
              className="text-sm text-slate-400 transition-colors hover:text-slate-100"
            >
              ← {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/library/$slug"
              params={{ slug: next.slug }}
              className="text-sm text-slate-400 transition-colors hover:text-slate-100 sm:text-right"
            >
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}

      <div className="mt-12 text-center">
        <Link
          to="/abacus"
          className="inline-block rounded-xl px-6 py-3 text-base font-semibold text-white transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: "#e8352c" }}
        >
          Open Calculus Abacus
        </Link>
      </div>
    </Shell>
  );
}
