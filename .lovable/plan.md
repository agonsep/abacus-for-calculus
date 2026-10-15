# Undo button: step back toward the original curve

## Goal
Let the user go back through the steps they took (Fill Board → Find Differences → Divide By Increment, repeated any number of times) one step at a time until the original curve is back on the board. This is a plain undo: each step brings back the board exactly as it was before. Nothing is recalculated.

## What the user sees
- A new **Undo** button below Divide By Increment in the right panel.
- After a **Divide By Increment**, Undo brings back the previous board: the size stones, the change-size stones (in their change-size color), the stone value, the floor, the companion stacks, and the left-panel table.
- After a **Find Differences**, Undo removes the change-size stones and leaves the size curve.
- Pressing Undo repeatedly walks back through every round until the board matches the original Fill Board. At that point Undo is greyed out.
- Undo is greyed out during animations, before the first Fill Board, and once nothing is left to undo. Fill Board starts a fresh history.
- The change happens instantly, with no reverse animation. The left panel and the equation reminder update to match the restored board.
- One sentence is added to the Help panel describing Undo.

## What stays the same
All forward behavior, the notices, and the animations stay exactly as they are. Today, pressing Divide By Increment when there are no change-size stones steps back one level, and it keeps working that way. No articles or exercises change; the Fundamental Theorem lesson material can come later.

## Technical details
- Reuse the existing `levelStack` snapshots that `demoteLevel` restores (they already hold `change`, `unit`, `floorValue`, the companions, `divisors`, and so on).
- Add a small history of action kinds (`"diff" | "promote"`) that is pushed in the Find Differences and promotion commit paths. Undo pops the last entry:
  - `promote` → call `demoteLevel()`, which restores the snapshot taken before that promotion, change-size stones included.
  - `diff` → clear the change-size stones and their slope readouts, matching the state before Find Differences.
- Reset the history in `setup` (Fill Board). Disable Undo when the history is empty or `anim` is set.
- Add a roadmap.md entry; the AGENTS.md rule stays unless the structure changes.
- Verify in Playwright: Fill → Diff → Divide → Undo → Undo restores the original counts, both in ordinary mode and in Dual Increments mode across two rounds; no page errors; build OK.
