# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository structure

This is the `mattwhitaker.name` monorepo:

- `packages/www` — the main personal website: a single-page, scroll-driven **Astro** site with Tailwind v4 and GSAP/ScrollTrigger, plus per-project detail pages. This is what the rest of this document describes.
- `packages/blog` — the blog subsite (deployed alongside www at `/blog`; not currently wired into the root build).
- `packages/core` — shared reusable tools.
- `packages/assets` — shared static assets (not an npm workspace).

**Everything below is scoped to `packages/www`** — all relative paths (`src/...`, `astro.config.mjs`, etc.) are relative to that package's directory, not the repo root. If a task is actually about the blog or core packages instead, this document doesn't cover them.

Root-level scripts (`npm run build`, `npm run pack`) build the www workspace and `rsync` its `dist/` into a combined root `dist/` for deployment; CI (`.github/workflows/`) builds on every push and deploys to S3/CloudFront on `mainline`. Day-to-day: `cd packages/www && npm run dev` (Astro dev server at `localhost:4321`). There's no test suite or linter configured yet.

**Node version**: the repo's `.nvmrc` pins `18.18.2`, but run `nvm use 20` (or newer) for anything in `packages/www` — that's what CI uses, and Astro's tooling assumes it.

## Architecture

### Astro: pages, layout, components

Static output only — no SSR, no client framework islands. GSAP does all client-side work via plain bundled `<script>`s.

- `src/pages/index.astro` assembles the homepage from one component per section (`src/components/`). Case Studies is currently disabled — its import/usage in `index.astro` is commented out — but the component, collection, and motion files are intact for re-enabling.
- `src/pages/projects/[id].astro` builds a detail page per entry in the projects content collection (`getStaticPaths` + `render(entry)`).
- `src/layouts/Layout.astro` owns the whole document: SEO meta (accepts `title`/`description`/`image` props with homepage defaults; canonical derives from `Astro.url.pathname`), JSON-LD Person schema, favicons/fonts, and two timing-critical scripts:
  - The **anti-flash script must stay `is:inline`** — it adds `.js-motion` to `<html>` before first paint so CSS can pre-hide the hero (`.js-motion [data-hero-item]` in `style.css`). If Astro bundles/defers it, the hero visibly flashes on load. Keep it in sync with the `gsap.to()` values in `src/motion/hero.js`.
  - `main.js` loads through a normal bundled `<script>` (deferred module) at the end of `<body>`.

`site.config.js` (package root) holds site-wide values: canonical `url`, `description`, contact/social links, and `navLinks`. Nav links are deliberately root-relative (`/#career`, not `#career`) so they work from detail pages; on the homepage they behave identically.

### Content collections: Projects and Case Studies

`src/content.config.ts` defines both collections with a shared zod schema (`title`, `blurb`, `tags`, `href`, `thumbnail` — validated at build time). They render through one shared card, `src/components/ContentCard.astro`, parameterized by `item`, `attr` (the data-attribute each grid's motion targets, e.g. `data-project-card`), and an optional `href` override. `src/motion/card-reveal.js` is the shared `ScrollTrigger.batch` stagger-reveal both grids call into with their own selector.

- **Projects** are markdown (`src/content/projects/*.md`): frontmatter feeds the card, the body renders on the detail page (styled by `.project-body` element selectors in `style.css` — markdown output carries no classes). Cards link to `/projects/<id>`; the detail page carries the external "Visit …" link. Adding a project = dropping in a `.md` file, never a markup change.
- **Case studies** are YAML (`src/content/case-studies/*.yaml`) — no bodies or detail pages yet. `ContentCard` opens external hrefs in a new tab and internal ones in the same tab, keyed on the `http` prefix.

The career skill data is not a collection — it stays in `src/data/career-skills.js`.

The sitemap is generated at build by `@astrojs/sitemap` (as `sitemap-index.xml` — the integration always emits the index format; `public/robots.txt` points there). Routes are auto-discovered; `customPages` in `astro.config.mjs` covers subsites deployed alongside www that this build can't see (`/blog`). Don't hand-maintain a `public/sitemap.xml`.

### Styling: Tailwind v4, CSS-first, one fluid root lever

`src/style.css` *is* the Tailwind config — there's no `tailwind.config.js`. The design system lives in a single `@theme` block: colors, fonts, and a few extended tokens (`--text-2xs`, `--aspect-card`). Tailwind hooks in via `@tailwindcss/vite` in `astro.config.mjs`'s `vite.plugins` passthrough.

Two color tokens are deliberately *derived*, not hardcoded, via native `color-mix()`:
- `--color-accent-soft` — `--color-accent` lightened, for hover states.
- `--color-paper` — white tinted with a touch of `--color-accent`, so the background always harmonizes with whatever accent is chosen.

Changing the site's whole look is meant to be a one-line edit to `--color-accent`.

**The fluid root lever**: `html { font-size: clamp(...) }` scales from 100% to 125% between 400px and 1536px viewports. Because Tailwind's entire scale (`--spacing`, every `--text-*`, `--container-*`) is rem-based, this one rule grows spacing/type/container-widths together continuously with viewport width, instead of needing `lg:`/`xl:` steps added to every element by hand. Prefer this over adding manual breakpoint variants for pure size growth; breakpoints are still the right tool for genuine layout-mode changes (flex-direction switches, grid column counts).

Reusable multi-property patterns (`.chip`, `.skill-bar__*`, `.career-layer__*`, `.emwhit-bar`, `.project-body`) live under `@layer components`, built from `@apply`'d utilities/theme tokens; one-off layout stays as Tailwind classes inline in the markup. A documented (comment-only — Tailwind can't enforce it) opacity convention sits at the top of the file: `/80` for body copy, `/60` for secondary text, `/50` for footer-only chrome; `/10` for structural borders, `/20` for interactive borders on dark backgrounds.

Classes toggled from JS (e.g. `text-paper`/`text-ink` in the nav invert) are picked up because Tailwind scans `src/motion/*.js` too — don't build class names by string concatenation or they won't be generated.

### The Career section: a GSAP-pinned "folder" (the centerpiece)

`src/components/Career.astro` + `src/motion/career.js` implement a pinned, scroll-scrubbed "tabbed folder" — four layers (Frontend/Backend/Data/Infra) that stack into accumulating tab headers as you scroll, above a `min-width: 880px` breakpoint (`DESKTOP_QUERY`). Below it, or with `prefers-reduced-motion`, the identical markup instead renders as plain stacked blocks in normal flow (`MOBILE_QUERY`) — there's no separate mobile markup, just different JS behavior applied to the same DOM.

Things worth knowing before touching this file:
- Each layer is set to `position: absolute; inset: 0` (only in the desktop branch, via JS), which requires `[data-career-stack]` to have `position: relative`. Without it, the layers size themselves against the next positioned ancestor up the tree (`section`, much bigger) instead of the folder's own box — this has broken more than once; if the folder's content looks too wide or misaligned with the rest of the page, check this first.
- The pin's `start` reserves the fixed nav's *actual measured height* (`navEl.getBoundingClientRect().height`), not a hardcoded value — otherwise the first tab renders behind the nav.
- Per-layer skill-bar reveals are triggered via `tl.call()` at the same scroll positions driving the slide-in tweens — a plain auto-playing tween once fired, not scrubbed to scroll position. This went through several iterations (see the comments in the file): scrubbing the reveal directly let the tab-click handler's instant `scrollTo` jump freeze it mid-tween, and a two-phase lead-in/finish version created a visible stutter from chaining two eased tweens back-to-back.
- `LAYER_VH` / `TRANSITION_UNITS` control pacing and are intentionally decoupled — bumping `LAYER_VH` only adds hang time, since the slide-in duration no longer scales with it.

### Motion conventions

Every scroll-driven or load-time animation is guarded by `gsap.matchMedia()` against `(prefers-reduced-motion: no-preference)`, so content is visible by default and only the motion-safe branch ever sets a hidden starting state. Pin/scrub mechanics additionally gate on a width breakpoint (`min-width: 880px`) since they only make sense with more horizontal room.

`src/main.js` is the single entry point: it registers `ScrollTrigger` once and calls each section's own `init*()` function — no animation logic lives in components or `main.js` itself. Every `init*()` bails if its section isn't in the DOM, which is what makes the same bundle safe on project detail pages (no hero, no career folder). `initHashSync()` must stay last — its deep-link jump reads pin positions the other inits create.

**Pinned layout vs. precomputed scroll ranges — the recurring trap**: a ScrollTrigger `start`/`end` is converted to fixed scroll-pixel values at refresh time, and the career/emwhit pins insert multi-viewport spacers that shift everything below them. Logic that needs "is X visually at/under Y right now" (the nav color invert in `emwhit.js`, the hash scrollspy in `hash-sync.js`) uses **IntersectionObserver** instead — it reads live rendered geometry and can't drift out of sync with pins. Several ScrollTrigger-range attempts at the nav invert failed before landing on this; don't reintroduce the pattern.

Section-specific notes:
- `nav.js` — swaps the fixed nav between transparent (over the hero) and opaque-scrolled styling; on pages with no hero (project detail pages) it applies the scrolled treatment immediately. The paper/ink color invert while the nav overlaps the dark emwhit section lives in `emwhit.js` (targets `[data-nav-invert]` elements), not here.
- `emwhit.js` — the equalizer bars are scroll-driven sines whose phase advances at `BAR_SPEED` (0.7 = 30% slower than scroll). The section is exactly `h-screen` and pins flush at `top top` — the nav invert handles the overlap, so the pin must *not* reserve nav height.
- `hash-sync.js` — homepage-only (bails without `[data-hero]`). Scrollspy: the section crossing a line 30% down the viewport claims the hash via `history.replaceState` (no history spam); the hash is stripped at the top of the page; a bottom-of-page clamp credits the last short section on tall viewports. Deep links (`/#music`) re-scroll after `window` load — the browser's native jump happens before pin spacers exist, so it always lands wrong without this — putting pinned sections exactly at their pin start.
