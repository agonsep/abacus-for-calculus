import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import CalculusAbacus from "@/components/CalculusAbacus";

// Search values may arrive as raw strings or be parsed into numbers/booleans by
// the router's default deserializer, so coerce everything back to a string.
const asOptionalString = z
  .unknown()
  .optional()
  .transform((v) =>
    v === undefined || v === null || v === "" ? undefined : String(v),
  );

const abacusSearchSchema = z.object({
  formula: asOptionalString,
  midpoint: asOptionalString,
  increment: asOptionalString,
  maxStones: asOptionalString,
});

export const Route = createFileRoute("/abacus")({
  component: AbacusPage,
  validateSearch: abacusSearchSchema,
  head: () => ({
    meta: [
      { title: "The Calculus Abacus — Interactive Board" },
      {
        name: "description",
        content:
          "Type a formula and watch stones stack across columns: each column is x, the stack height is y, and orange stones show the differences.",
      },
      { property: "og:title", content: "The Calculus Abacus — Interactive Board" },
      {
        property: "og:description",
        content:
          "Type a formula and watch stones stack across columns: each column is x, the stack height is y, and orange stones show the differences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function AbacusPage() {
  const { formula, midpoint, increment, maxStones } = Route.useSearch();
  return (
    <div className="relative">
      <Link
        to="/"
        className="absolute left-4 top-4 z-50 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-xs tracking-wide text-white/80 backdrop-blur transition-colors hover:bg-black/60 hover:text-white"
      >
        ← Home
      </Link>
      <CalculusAbacus
        initialDefaults={{
          formula,
          midpoint,
          increment,
          maxStones,
        }}
      />
    </div>
  );
}
