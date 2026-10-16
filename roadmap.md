# Roadmap

## Completed
- Rename the "Stack in one column" checkbox to "Stack differences" (label, Help paragraph, and the panel guard that keeps From/To changes from cancelling the demonstration); behaviour is unchanged.
- Remove the white reference line drawn over the board while "Stack in one column" is checked; the numeric endpoint comparison readout remains the only check. Drag handles stay hidden during the demonstration through the active journey instead of the line.
- Disable Reverse after a Dual Increments or w promotion (omitted in-between columns make the accumulation misleading), with an explanatory tooltip and Help note; ordinary promotion keeps Reverse.
- Default the Stack in one column span to columns 1 to 10; verified the From/To boxes open at 1 and 10, the default pile gathers 50 stones in column 10 with the comparison "column 11 − column 1 = 50", unchecking restores the difference stacks, and Reverse returns to the Fill Board stacks with no page errors.
- Keep camera framing unchanged throughout stacking and unchecking; verified identical camera zoom, position, and projection for partial/default ranges, manually zoomed promoted stacking, and reduced-motion Dual Increments with no page errors.
- Keep outside size stacks visible and select change columns inclusively; verified 3–9 sums to 39 and gathers in column 9, correct endpoint comparisons, ordinary/promoted outside counts, full-board ties, left comparison, signed/fractional and Dual stones, both board edges, reduced motion, exact restoration, and Reverse with no page errors.
- Gather selected change stacks at the highest pre-alignment stack instead of column 11; verified y=x² From 3–9 gathers in column 8 and default 1–11 in column 10, ordinary and Dual promotion, ties, left comparison, signed/fractional stones, reduced motion, exact restoration, and Reverse with no page errors.
- Add separate recoloring and conditional rescaling before promoted stacks align vertically and gather horizontally; visually verified ordinary and Dual Increments stages, Blue/Cyan colors, w, exact restoration, the 18-stone partial sum, and reduced-motion signed stacking with no page errors.
- Correct white change-size stones during Reverse by refreshing solid/gradient materials; visually verified all palettes, paired stacks, signed/fractional stones, exact restoration, and unchanged lifting with no page errors.
- Animate Reverse in separate right-to-left stages; verified differences removal, exact ordinary and Dual Increments restoration, skipping, and signed/fractional reduced-motion restoration with no page errors.
- Reveal initial change-size stacks column by column without falling; verified ordinary and paired differences, promotion, Reverse, Leibniz shelf, reduced motion, and signed/fractional stacking with no page errors.
- Reveal complete size stacks from left to right without falling, including paired and fractional stacks; keep change-stone motion, promotion, and Reverse. Visually checked filling, differences, dual promotion, and reduced motion with no page errors.
- Clarify Stack in one column with vertical alignment followed by individual horizontal slides to column 11, preserving signed totals and Reverse; visually verified the 18-stone partial span and restoration, with controls synchronized to actual movement completion.
- Connect calculus-abacus.com and www.calculus-abacus.com through GoDaddy; both addresses are verified and live.
- Add a "Reverse" checkbox under More (shows a Reverse button that steps back through Find Differences and Divide By Increment) and "Stack in one column" with From/To boxes, which piles the change-size stones onto the From column so the sum of changes meets f(To) − f(From); after promotion it stacks rates × increment. Help panel updated.
- Replace the stale "Exercise C" reference in “How the Abacus Works” with the exercise’s actual title, “From Differences to Rates”; no lettered exercise labels remain anywhere in the library.
- Update “How the Abacus Works” with essential explanations of Dual Increments, w, repeated derivatives, and Leibniz differentials; correct promotion, floor, tangent, controls, colors, precision, and limits while preserving its hands-on approach and triangular-number example.
- Rename the "Midpoint Tangent" checkbox to "Tangent" now that the line can move off the midpoint; the same box still draws the curve over the column tops and the tangent line, with a hover tip naming both, and the Help panel, the blocking messages, and the How the Abacus Works article use the new name.
- Add − and + buttons beside the "Midpoint Tangent" checkbox that shift the tangent line one column left or right, recomputing the slope at the new column; buttons disable at the board edges, when the box is unchecked, and during animations; the offset resets on Fill Board; Help panel updated.
- Add “From Secant to Tangent” as Exercise 2 for Estimation Before Formalization, preserving all teaching content, blank worksheet, worked table, and extracted diagram; verified exercise ordering and wide/narrow-screen rendering.
- Add “Correct the Guess” as Exercise 3 for Estimation Before Formalization, preserving content, both tables, and the extracted diagram.
- Move the “Student Activity” heading above the setup subheading in all three companion exercises (“From Columns to Area”, “From Secant to Tangent”, “Correct the Guess”) so the setup steps read as the first part of the student activity; verified heading order, tables, and diagrams on each page.
- Add “From Columns to Area” as Exercise 1 for Estimation Before Formalization, preserving its worksheets and endpoint diagram.
- Remove zoom buttons from the right panel of the Calculus Abacus; keep wheel/pinch zoom.
- Add selectable stone-color palettes (Red/Orange, Blue/Cyan, Forest/Mint) with right-panel picker, persisted choice, and matching panel/button/help highlights.
- Right panel shows only Fractional stones and Dual increments (larger) by default; a More/Less button reveals the rest and the color picker.
- Mid-board notice "Input second increment, then click on Fill Board" appears when Dual increments is checked; cleared by Fill Board or unchecking.
- Dual Increments division clears both size stacks, widens the change stack, then drops it, one column at a time before the final slope-curve conversion.
- Divide By Increment pauses after all stones fall to show a first notice for three seconds before adjusting counts — in Dual Increments "We divide by the second increment and rescale for a maximum of N stones.", otherwise "The value of one stone will change to X" — then shows "has changed to X" for three seconds together with the panel update; unchanged values show neither notice and do not pause.
- Help panel describes the Dual Increments pending setting, the mid-board notice, the companion stack's position left of f(x), and the per-column promotion animation with both notices.


