import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/library")({
  component: Library,
  head: () => ({
    meta: [
      { title: "About the Calculus Abacus — Articles & Exercises" },
      {
        name: "description",
        content:
          "A table of contents for teachers: articles explaining the calculus abacus and classroom exercises that use it.",
      },
      { property: "og:title", content: "About the Calculus Abacus" },
      {
        property: "og:description",
        content:
          "A table of contents for teachers: articles explaining the calculus abacus and classroom exercises that use it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

const articles = [
  { title: "What the Abacus Counts", blurb: "Columns are x, stacks are y, and one stone is a unit." },
  { title: "Differences and the Change-Size Stones", blurb: "Reading the orange stones as Δy over an increment." },
  { title: "Dividing by the Increment", blurb: "How a difference curve becomes a slope curve." },
  { title: "Infinitesimals: Typing w as the Increment", blurb: "Exact derivatives from dual numbers." },
  { title: "Leibniz Mode", blurb: "dy = f′(x)·dx on a shelf above the board." },
];

const exercises = [
  { title: "Stacking y = x²", blurb: "First board, first differences, first pattern." },
  { title: "Constant Differences and Straight Lines", blurb: "Recognizing linear behavior from the stones." },
  { title: "Estimating a Tangent Slope", blurb: "Using the increment and the unit scale together." },
  { title: "Second Differences", blurb: "Clicking Divide By Increment twice." },
  { title: "Undefined Columns", blurb: "What the gray columns tell students." },
];

function Section({ heading, items }: { heading: string; items: { title: string; blurb: string }[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-sm font-semibold uppercase tracking-[0.25em]" style={{ color: "#ff932a" }}>
        {heading}
      </h2>
      <ul className="mt-4 divide-y divide-white/10 rounded-xl border border-white/10">
        {items.map((it) => (
          <li key={it.title} className="px-5 py-4">
            <div className="text-base font-medium" style={{ color: "#f5e8c8" }}>
              {it.title}
            </div>
            <div className="mt-1 text-sm text-slate-400">{it.blurb}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Library() {
  return (
    <main className="min-h-screen px-6 py-14" style={{ backgroundColor: "#141c33" }}>
      <div className="mx-auto w-full max-w-2xl">
        <Link to="/" className="text-xs tracking-wide text-slate-400 transition-colors hover:text-slate-200">
          ← Home
        </Link>
        <h1 className="mt-6 font-serif text-3xl font-bold sm:text-4xl" style={{ color: "#f5e8c8" }}>
          About the Calculus Abacus
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          Articles and exercises for teachers. Titles below are placeholders for the documents to come.
        </p>

        <Section heading="Articles" items={articles} />
        <Section heading="Exercises" items={exercises} />

        <div className="mt-12">
          <Link
            to="/abacus"
            className="inline-block rounded-xl px-6 py-3 text-base font-semibold text-white transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: "#e8352c" }}
          >
            Open the Calculus Abacus
          </Link>
        </div>
      </div>
    </main>
  );
}
