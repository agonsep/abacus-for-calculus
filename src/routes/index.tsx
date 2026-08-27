import { createFileRoute, Link } from "@tanstack/react-router";
import abacusImage from "@/assets/abacus-home.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "The Calculus Abacus — A Hands-On Tool for Teaching Calculus" },
      {
        name: "description",
        content:
          "An abacus for differences. Launch the interactive board, or browse articles and exercises written for teachers.",
      },
      { property: "og:title", content: "The Calculus Abacus" },
      {
        property: "og:description",
        content:
          "An abacus for differences. Launch the interactive board, or browse articles and exercises written for teachers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-6 py-14"
      style={{ backgroundColor: "#141c33" }}
    >
      <div className="w-full max-w-2xl text-center">
        <h1
          className="font-serif text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ color: "#f5e8c8" }}
        >
          The Calculus Abacus
        </h1>
        <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-400">
          An abacus for differences
        </p>

        <img
          src={abacusImage}
          alt="The Calculus Abacus showing y = x squared: red size stones stacked into a parabola with orange change-size stones above them"
          width={1275}
          height={1290}
          className="mx-auto mt-10 w-full max-w-md rounded-2xl border border-white/10 shadow-2xl"
        />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/abacus"
            className="flex-1 rounded-xl px-8 py-5 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: "#e8352c" }}
          >
            The Calculus Abacus
          </Link>
          <Link
            to="/library"
            className="flex-1 rounded-xl px-8 py-5 text-lg font-semibold shadow-lg transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: "#ff932a", color: "#2a1600" }}
          >
            About the Calculus Abacus
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-500">
          Use the board, or read the articles and exercises written for teachers.
        </p>
      </div>
    </main>
  );
}
