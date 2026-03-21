# Header spacing — implementation plan

> **For Claude:** If extending this work, implement task-by-task and verify in the browser after each change.

**Goal:** Fix header logo/nav spacing and alignment using CSS and correct Bootstrap utility class.

**Architecture:** Single-page static site; styles live in `Css/style.scss` (source) and `Css/style.css` (loaded by `index.html` via `Style.Css`).

**Tech stack:** HTML, Bootstrap 5 (local), SCSS/CSS.

---

### Task 1: Update header flex layout in SCSS

**Files:**

- Modify: `Css/style.scss` (header block)

**Steps:**

1. Add `display: flex`, `justify-content: space-between`, `align-items: center`, `gap: 70px`, horizontal centering (`left: 50%`, `transform: translateX(-50%)`), `z-index: 10`, `box-sizing: border-box`.

### Task 2: Mirror compiled CSS

**Files:**

- Modify: `Css/style.css` (same rules as Task 1)

**Steps:**

1. Keep `style.css` in sync so the page works without recompiling SCSS.

### Task 3: Nav list row layout

**Files:**

- Modify: `Css/style.scss`, `Css/style.css` (`header div ul`)

**Steps:**

1. Set `display: flex`, `flex-direction: row`, `align-items: center`.
2. Remove `flex-direction: rtl`.

### Task 4: Fix Bootstrap class on `<header>`

**Files:**

- Modify: `index.html`

**Steps:**

1. Replace `justify-content-space-between` with `justify-content-between`.

### Task 5: Verify

**Steps:**

1. Open `index.html` in a browser (file or local server).
2. Confirm logo left, links right (or correct RTL site-wide if you add `dir="rtl"` later), no overlap with hero text, reasonable spacing at desktop and mobile widths.

---

**Status:** Tasks 1–4 implemented as of 2026-03-18.
