import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  articleGroups,
  getAdjacentEntries,
  getLibraryEntry,
} from "@/content/library";
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
    <main className="min-h-screen bg-white px-6 py-14 text-slate-900">
      <div className="mx-auto w-full max-w-2xl">{children}</div>
    </main>
  );
}

function EntryNotFound() {
  return (
    <Shell>
      <Link
        to="/library"
        className="text-xs tracking-wide text-slate-500 transition-colors hover:text-slate-900"
      >
        ← About the Calculus Abacus
      </Link>
      <h1 className="mt-16 font-serif text-3xl font-bold text-slate-900">
        Page not found
      </h1>
      <p className="mt-4 text-sm text-slate-600">
        That article or exercise does not exist yet.
      </p>
    </Shell>
  );
}

function LibraryEntryPage() {
  const { entry, previous, next } = Route.useLoaderData();
  const parentArticle = entry.parent ? getLibraryEntry(entry.parent) : undefined;
  const childExercises =
    entry.section === "article"
      ? (articleGroups.find((g) => g.article.slug === entry.slug)?.exercises ?? [])
      : [];

  return (
    <Shell>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-wide">
        <Link
          to="/library"
          className="text-slate-500 transition-colors hover:text-slate-900"
        >
          ← About the Calculus Abacus
        </Link>
        {parentArticle ? (
          <>
            <span className="text-slate-300">·</span>
            <Link
              to="/library/$slug"
              params={{ slug: parentArticle.slug }}
              className="text-slate-500 transition-colors hover:text-slate-900"
            >
              Exercises for: {parentArticle.title}
            </Link>
          </>
        ) : null}
      </div>


      <article className="mt-10">
        <h1 className="font-serif text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
          {entry.title}
        </h1>
        {entry.summary ? (
          <p className="mt-3 text-sm text-slate-600">{entry.summary}</p>
        ) : null}

        <div className="mt-8">
          <LibraryProse>{entry.body}</LibraryProse>
        </div>

        {entry.acknowledgement ? (
          <p className="mt-10 text-sm text-slate-500">
            {entry.acknowledgement}
          </p>
        ) : null}
      </article>

      {childExercises.length > 0 && (
        <section className="mt-14 border-t border-slate-200 pt-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Exercises for this article
          </h2>
          <ul className="mt-4 space-y-2">
            {childExercises.map((exercise) => (
              <li key={exercise.slug}>
                <Link
                  to="/library/$slug"
                  params={{ slug: exercise.slug }}
                  className="text-sm text-blue-700 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-blue-900"
                >
                  {exercise.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(previous || next) && (
        <nav className="mt-16 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
          {previous ? (
            <Link
              to="/library/$slug"
              params={{ slug: previous.slug }}
              className="text-sm text-slate-500 transition-colors hover:text-slate-900"
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
              className="text-sm text-slate-500 transition-colors hover:text-slate-900 sm:text-right"
            >
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}

    </Shell>
  );
}
