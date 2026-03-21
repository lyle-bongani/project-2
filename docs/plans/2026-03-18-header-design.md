# Header spacing — design

**Date:** 2026-03-18  
**Problem:** Logo and navigation spacing/alignment looked wrong.  
**Chosen approach:** B — fix in CSS (with optional HTML class correction).

## Context

- `index.html` uses Bootstrap utilities on `<header>`, but `justify-content-space-between` is not a valid Bootstrap class (should be `justify-content-between`).
- `Css/style.scss` / `Css/style.css` positioned the header with `position: absolute` and `width: 90%` without explicit flex layout on `header`, and used `flex-direction: rtl` on the nav list, which affected order/spacing.

## Decisions

1. **`header`** — Use flexbox explicitly: `display: flex`, `justify-content: space-between`, `align-items: center`, keep `gap: 70px`. Center the bar horizontally with `left: 50%` + `transform: translateX(-50%)` so a 90%-wide absolute header sits in the middle of the viewport. Add `z-index: 10` so it stays above the hero. Use `box-sizing: border-box` with padding.
2. **`header div ul`** — `display: flex`, `flex-direction: row`, `align-items: center`, keep `gap: 7%` and typography; **remove** `flex-direction: rtl`.
3. **HTML** — Change class to `justify-content-between` so Bootstrap matches intent (redundant with CSS but correct).

## Out of scope

- Sticky/fixed header on scroll (not requested).
- Mobile hamburger menu (not requested).

## Approval

User chose approach B and asked to continue implementation.
