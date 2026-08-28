import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { articles, exercises, type LibraryEntry } from "@/content/library";

export const Route = createFileRoute("/library")({
  component: LibraryLayout,
  head: () => ({
    meta: [
      { title: "About the Calculus Abacus — Articles and Exercises for Teachers" },
      {
        name: "description",
        content:
          "Articles and exercises about the Calculus Abacus, written for teachers: differences, dividing by the increment, infinitesimals, and Leibniz Mode.",
      },
      { property: "og:title", content: "About the Calculus Abacus" },
      {
        property: "og:description",
        content:
          "Articles and exercises about the Calculus Abacus, written for teachers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function LibraryLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/library/$slug");
  return isChild ? <Outlet /> : <LibraryIndex />;
}

function EntryLink({ entry }: { entry: LibraryEntry }) {
  return (
    <li>
      <Link
        to="/library/$slug"
        params={{ slug: entry.slug }}
        className="block rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:border-white/20 hover:bg-white/10"
      >
        <span className="font-serif text-lg font-semibold text-[#f5e8c8]">
          {entry.title}
        </span>
        {entry.summary ? (
          <span className="mt-1 block text-sm text-slate-300">{entry.summary}</span>
        ) : null}
      </Link>
    </li>
  );
}

function LibraryIndex() {
  const hasContent = articles.length > 0 || exercises.length > 0;

  return (
    <main className="min-h-screen px-6 py-14 text-[#f5e8c8]" style={{ backgroundColor: "#141c33" }}>
      <div className="mx-auto w-full max-w-2xl">
        <Link
          to="/"
          className="text-xs tracking-wide text-slate-400 transition-colors hover:text-[#f5e8c8]"
        >
          ← Home
        </Link>

        <h1 className="mt-10 font-serif text-4xl font-bold text-[#f5e8c8] sm:text-5xl">
          About the Calculus Abacus
        </h1>
        <p className="mt-4 text-sm text-slate-300">
          Articles and exercises written for teachers.
        </p>

        {!hasContent ? (
          <p className="mt-14 text-center text-sm text-slate-400">
            Coming Soon — articles and exercises will appear here.
          </p>
        ) : (
          <>
            {articles.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Articles
                </h2>
                <ul className="mt-4 space-y-3">
                  {articles.map((entry) => (
                    <EntryLink key={entry.slug} entry={entry} />
                  ))}
                </ul>
              </section>
            )}

            {exercises.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Exercises
                </h2>
                <ul className="mt-4 space-y-3">
                  {exercises.map((entry) => (
                    <EntryLink key={entry.slug} entry={entry} />
                  ))}
                </ul>
              </section>
            )}
          </>
        )}

        <div className="mt-14 text-center">
          <Link
            to="/abacus"
            className="inline-block rounded-xl px-6 py-3 text-base font-semibold text-white transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: "#e8352c" }}
          >
            Open Calculus Abacus
          </Link>
        </div>
      </div>
    </main>
  );
}
