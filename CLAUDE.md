# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository structure

This is the `mattwhitaker.name` npm-workspaces monorepo:

- `packages/www` — the main personal website: a single-page, scroll-driven site built with EJS partials, Tailwind v4, and GSAP/ScrollTrigger. This is what the rest of this document describes.
- `packages/blog` — the blog subsite.
- `packages/core` — shared reusable tools.
- `packages/assets` — shared static assets (not an npm workspace).

**Everything below is scoped to `packages/www`** — all relative paths (`src/...`, `vite.config.js`, etc.) are relative to that package's directory, not the repo root. If a task is actually about the blog or core packages instead, this document doesn't cover them.

Root-level scripts (`npm run build`, `npm run pack`) orchestrate all workspaces and `rsync` each one's `dist/` into a combined root `dist/` for deployment; CI (`.github/workflows/`) builds on every push and deploys to S3/CloudFront on `mainline`. To develop the website day-to-day: `cd packages/www && npm run dev` (see that package's own `package.json` for its build/preview scripts — there's no test suite or linter configured for it yet).

**Node version**: the repo's `.nvmrc` pins `18.18.2`, but `packages/www`'s Vite 8 requires Node 20.19+ or 22.12+ and will throw (`CustomEvent is not defined`) on 18.x. Run `nvm use 20` (or newer) before any `vite`/`npm run dev|build` command in that package.

## Architecture

### Templating: EJS partials via vite-plugin-html

`vite.config.js` wires `vite-plugin-html` to render `index.html` as an EJS template, injecting one shared `data` object (assembled from `site.config.js` and the files in `src/data/`) into scope for every partial. `index.html` assembles the page by `include()`-ing one partial per section from `src/partials/`; nested partials (`skill-bars.ejs`, `content-card.ejs`) are included *inside* other partials and inherit that same top-level data automatically — passing locals explicitly to an `include()` only adds to/overrides that inherited scope, it doesn't replace it.

Gotcha: EJS's relative `include()` paths resolve against `ejsOptions.filename`, which must be set explicitly (to `index.html`'s absolute path) or partial-to-partial includes fail to resolve.

### Styling: Tailwind v4, CSS-first, one fluid root lever

`src/style.css` *is* the Tailwind config — there's no `tailwind.config.js`. The design system lives in a single `@theme` block: colors, fonts, and a few extended tokens (`--text-2xs`, `--aspect-card`).

Two color tokens are deliberately *derived*, not hardcoded, via native `color-mix()` (the same mechanism Tailwind's own `/NN` opacity modifiers already compile to):
- `--color-accent-soft` — `--color-accent` lightened, for hover states.
- `--color-paper` — white tinted with a touch of `--color-accent`, so the background always harmonizes with whatever accent is chosen.

Changing the site's whole look is meant to be a one-line edit to `--color-accent`.

**The fluid root lever**: `html { font-size: clamp(...) }` scales from 100% to 125% between 400px and 1536px viewports. Because Tailwind's entire scale (`--spacing`, every `--text-*`, `--container-*`) is rem-based, this one rule grows spacing/type/container-widths together continuously with viewport width, instead of needing `lg:`/`xl:` steps added to every element by hand. Prefer this over adding manual breakpoint variants for pure size growth; breakpoints are still the right tool for genuine layout-mode changes (flex-direction switches, grid column counts).

Reusable multi-property patterns (`.chip`, `.skill-bar__*`, `.career-layer__*`, `.emwhit-bar`) live under `@layer components`, built from `@apply`'d utilities/theme tokens; one-off layout stays as Tailwind classes inline in the markup. A documented (comment-only — Tailwind can't enforce it) opacity convention sits at the top of the file: `/80` for body copy, `/60` for secondary text, `/50` for footer-only chrome; `/10` for structural borders, `/20` for interactive borders on dark backgrounds.

### The Career section: a GSAP-pinned "folder" (the centerpiece)

`src/partials/career.ejs` + `src/motion/career.js` implement a pinned, scroll-scrubbed "tabbed folder" — four layers (Frontend/Backend/Data/Infra) that stack into accumulating tab headers as you scroll, above a `min-width: 880px` breakpoint (`DESKTOP_QUERY`). Below it, or with `prefers-reduced-motion`, the identical markup instead renders as plain stacked blocks in normal flow (`MOBILE_QUERY`) — there's no separate mobile markup, just different JS behavior applied to the same DOM.

Things worth knowing before touching this file:
- Each layer is set to `position: absolute; inset: 0` (only in the desktop branch, via JS), which requires `[data-career-stack]` to have `position: relative`. Without it, the layers size themselves against the next positioned ancestor up the tree (`section`, much bigger) instead of the folder's own box — this has broken more than once; if the folder's content looks too wide or misaligned with the rest of the page, check this first.
- The pin's `start` reserves the fixed nav's *actual measured height* (`navEl.getBoundingClientRect().height`), not a hardcoded value — otherwise the first tab renders behind the nav.
- Per-layer skill-bar reveals are triggered via `tl.call()` at the same scroll positions driving the slide-in tweens — a plain auto-playing tween once fired, not scrubbed to scroll position. This went through several iterations (see the comments in the file): scrubbing the reveal directly let the tab-click handler's instant `scrollTo` jump freeze it mid-tween, and a two-phase lead-in/finish version created a visible stutter from chaining two eased tweens back-to-back.
- `LAYER_VH` / `TRANSITION_UNITS` control pacing and are intentionally decoupled — bumping `LAYER_VH` only adds hang time, since the slide-in duration no longer scales with it.

### Card grids: Projects and Case Studies share one component

`src/partials/content-card.ejs` is the single card component for both grids, parameterized by `item` (the data entry) and `attr` (the raw data-attribute stamped on the card, e.g. `data-project-card`, so each grid's motion targets only its own cards). `src/motion/card-reveal.js` is the shared `ScrollTrigger.batch` stagger-reveal that both `projects.js` and `case-studies.js` call into with their own selector. Data lives in `src/data/projects.js` / `src/data/case-studies.js` (same shape: `title`, `blurb`, `tags`, `href`, `thumbnail`) — adding an entry is a data edit, never a markup change.

Case Studies is currently disabled — its `include()` in `index.html` and its `initCaseStudies()` call in `main.js` are both commented out — but the partial/data/motion files are intact for re-enabling.

### Motion conventions

Every scroll-driven or load-time animation is guarded by `gsap.matchMedia()` against `(prefers-reduced-motion: no-preference)`, so content is visible by default and only the motion-safe branch ever sets a hidden starting state. Pin/scrub mechanics additionally gate on a width breakpoint (`min-width: 880px`) since they only make sense with more horizontal room.

`main.js` is the single entry point: it registers `ScrollTrigger` once and calls each section's own `init*()` function — no animation logic lives in `main.js` itself.
