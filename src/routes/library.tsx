import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/library")({
  component: Library,
  head: () => ({
    meta: [
      { title: "About the Calculus Abacus — Coming Soon" },
      {
        name: "description",
        content:
          "Articles and exercises about the Calculus Abacus for teachers are coming soon.",
      },
      { property: "og:title", content: "About the Calculus Abacus" },
      {
        property: "og:description",
        content:
          "Articles and exercises about the Calculus Abacus for teachers are coming soon.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function Library() {
  return (
    <main className="min-h-screen px-6 py-14" style={{ backgroundColor: "#141c33" }}>
      <div className="mx-auto w-full max-w-2xl">
        <Link to="/" className="text-xs tracking-wide text-slate-400 transition-colors hover:text-slate-200">
          ← Home
        </Link>

        <div className="mt-24 text-center">
          <h1 className="font-serif text-4xl font-bold sm:text-5xl" style={{ color: "#f5e8c8" }}>
            Coming Soon
          </h1>
          <p className="mt-4 text-sm text-slate-400">
            Articles and exercises about the Calculus Abacus will appear here.
          </p>

          <div className="mt-10">
            <Link
              to="/abacus"
              className="inline-block rounded-xl px-6 py-3 text-base font-semibold text-white transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: "#e8352c" }}
            >
              Open Calculus Abacus
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
