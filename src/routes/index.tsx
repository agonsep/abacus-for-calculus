import { createFileRoute } from "@tanstack/react-router";
import CalculusAbacus from "@/components/CalculusAbacus";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Calculus Abacus — visualize formulas in 3D" },
      { name: "description", content: "A 3D abacus for calculus. Type a formula and watch pieces stack across columns where each column is x and the stack height is y." },
    ],
  }),
});

function Index() {
  return <CalculusAbacus />;
}
