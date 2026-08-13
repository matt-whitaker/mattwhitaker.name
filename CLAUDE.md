# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository structure

This is the `mattwhitaker.name` monorepo:

- `packages/www` — the main personal website: a single-page, scroll-driven **Astro** site with Tailwind v4 and GSAP/ScrollTrigger, plus per-project and per-archive detail pages. This is what the rest of this document describes.
- `packages/blog` — the blog subsite (deployed alongside www at `/blog`; not currently wired into the root build).
- `packages/core` — shared reusable tools.
- `packages/assets` — shared static assets (not an npm workspace).

**Everything below is scoped to `packages/www`** — all relative paths (`src/...`, `astro.config.mjs`, etc.) are relative to that package's directory, not the repo root. If a task is actually about the blog or core packages instead, this document doesn't cover them.

Root-level scripts (`npm run build`, `npm run pack`) build the www workspace and `rsync` its `dist/` into a combined root `dist/` for deployment; CI (`.github/workflows/`) builds on every push and deploys to S3/CloudFront on `mainline`. Day-to-day: `cd packages/www && npm run dev` (Astro dev server at `localhost:4321`). There's no test suite or linter configured yet.

**Node version**: the repo's `.nvmrc` pins `18.18.2`, but run `nvm use 20` (or newer) for anything in `packages/www` — that's what CI uses, and Astro's tooling assumes it.

**Dev-server gotcha worth knowing up front**: adding or removing a module import (or an npm dependency) *while `npm run dev` is running* can leave Vite serving stale optimized-dependency URLs. It surfaces as `Failed to fetch dynamically imported module` in the browser console, and because nearly every section imports GSAP, the whole `main.js` chain silently dies — the clearest symptom is the hero never un-hiding (stuck at `opacity: 0`). Console is otherwise clean, so it's easy to misdiagnose as a code bug. The fix is a clean restart: `rm -rf node_modules/.vite && npm run dev`. `npm run build` is unaffected, so **build to sanity-check code, restart dev to actually view it.**

## Architecture

### Astro: pages, layout, components

Static output only — no SSR, no client framework islands. GSAP does all client-side work via plain bundled `<script>`s.

- `src/pages/index.astro` assembles the homepage from one component per section (`src/components/`), in scroll order: Hero, Stack, Career, Projects, Archives, Pnw, Emwhit, SocialFooter (with Nav on top).
- `src/pages/projects/[id].astro` and `src/pages/archives/[id].astro` each build a detail page per entry in their content collection (`getStaticPaths` + `render(entry)`).
- `src/layouts/Layout.astro` owns the whole document: SEO meta (accepts `title`/`description`/`image` props with homepage defaults; canonical derives from `Astro.url.pathname`), JSON-LD Person schema, favicons/fonts, the FontAwesome kit, and two timing-critical scripts:
  - The **anti-flash script must stay `is:inline`** — it adds `.js-motion` to `<html>` before first paint so CSS can pre-hide the hero (`.js-motion [data-hero-item]` in `style.css`). If Astro bundles/defers it, the hero visibly flashes on load. Keep it in sync with the `gsap.to()` values in `src/motion/hero.js`.
  - `main.js` loads through a normal bundled `<script>` (deferred module) at the end of `<body>`.

`site.config.js` (package root) holds site-wide values: canonical `url`, `description`, contact/social links, the FontAwesome kit URL, fonts, and `navLinks`. Nav links are deliberately root-relative (`/#career`, not `#career`) so they work from detail pages; on the homepage they behave identically.

### Content collections: Projects and Archives

`src/content.config.ts` defines both collections with a shared zod schema (`title`, `blurb`, `tags`, `href`, `thumbnail` — validated at build time). Both are **markdown** (`glob` loader, `**/*.md`). They render through one shared card, `src/components/ContentCard.astro`, parameterized by `item`, `attr` (the data-attribute each grid's motion targets, e.g. `data-project-card` / `data-archive-card`), and an optional `href` override. `src/motion/card-reveal.js` is the shared `ScrollTrigger.batch` stagger-reveal both grids call into with their own selector.

- **Projects** (`src/content/projects/*.md`) and **Archives** (`src/content/archives/*.md`): frontmatter feeds the card, the body renders on the detail page (styled by `.rich-text` element selectors in `style.css` — markdown output carries no classes, so element selectors it is; the class is shared by both detail-page templates). Both grids pass an `href` override so cards link to their internal detail page (`/projects/<id>`, `/archives/<id>`); the detail page carries the external "Visit …" link. `ContentCard` opens external hrefs (starting with `http`) in a new tab and internal ones in the same tab. **Adding an entry = dropping in a `.md` file, never a markup change.**
- Both grids and detail-page routes are live. ("Archives" was previously called "Case Studies" and lived as bodyless YAML — that's fully migrated; don't reintroduce the old naming.)

Non-collection data lives in `src/data/`: `career-skills.js` (the skill bars), `career-focus.js` (the career layers' left-column copy), and `stack.js` (the radial stack wheel). These are plain JS modules, not collections.

The sitemap is generated at build by `@astrojs/sitemap` (as `sitemap-index.xml` — the integration always emits the index format; `public/robots.txt` points there). Routes are auto-discovered; a `filter` in `astro.config.mjs` drops specific routes from the sitemap, and `customPages` (currently empty) is where subsites this build can't see would go. Don't hand-maintain a `public/sitemap.xml`.

### Icons: FontAwesome + astro-icon (Simple Icons), a hybrid

Two icon systems, by necessity:

- **FontAwesome** — loaded as a kit `<script>` in `Layout.astro` (`site.fontawesome`). Used via `<i class="fa-brands fa-…">`. Covers most brand glyphs and the social icons.
- **astro-icon** (the `icon()` integration in `astro.config.mjs`) — inlines SVGs at **build time**, zero client JS. Pulls from the installed `@iconify-json/simple-icons` set, referenced as `simple-icons:<slug>` via `<Icon name="simple-icons:…" />`, for the brands FontAwesome *doesn't* have (Tailwind, TypeScript, TanStack, Redux, Vite, Storybook, Terraform, Claude Code, …). Local project SVGs live in `src/icons/` (e.g. `headshot-icon.svg`, authored with `fill:currentColor` so a `text-*` class on the wrapper recolors it) and are referenced by bare filename: `<Icon name="headshot-icon" />`.

The stack-wheel data (`src/data/stack.js`) encodes this hybrid per glyph: an entry has either a `className` (FontAwesome) or an `icon` (astro-icon slug). **The build validates every `simple-icons:` name** — a wrong slug fails `astro build`, so a build is the fastest way to check one. Before wiring a Simple Icons slug, verify it exists (slugs list: `raw.githubusercontent.com/simple-icons/simple-icons/develop/slugs.md`); several brands people assume exist don't (e.g. Emotion).

### Styling: Tailwind v4, CSS-first, one fluid root lever

`src/style.css` *is* the Tailwind config — there's no `tailwind.config.js`. The design system lives in a single `@theme` block: colors, fonts, and a few extended tokens (`--text-2xs`, `--aspect-card`). Tailwind hooks in via `@tailwindcss/vite` in `astro.config.mjs`'s `vite.plugins` passthrough.

Two color tokens are deliberately *derived*, not hardcoded, via native `color-mix()`:
- `--color-accent-soft` — `--color-accent` lightened, for hover states.
- `--color-paper` — white tinted with a touch of `--color-accent`, so the background always harmonizes with whatever accent is chosen.

Changing the site's whole look is meant to be a one-line edit to `--color-accent`.

**Where the dark lives**: `--color-ink` is the big color field — the Stack section, the career folder's Frontend layer, and Emwhit. `--color-accent` (the stone) is deliberately *not* used as a large background; it survives as the solid CTA-button fill, section eyebrows, rich-text links, and small marks like the career bullets and skill-bar fills.

**The fluid root lever**: `html { font-size: clamp(...) }` scales from 100% to 125% between 400px and 1536px viewports. Because Tailwind's entire scale (`--spacing`, every `--text-*`, `--container-*`) is rem-based, this one rule grows spacing/type/container-widths together continuously with viewport width, instead of needing `lg:`/`xl:` steps added to every element by hand. Prefer this over adding manual breakpoint variants for pure size growth; breakpoints are still the right tool for genuine layout-mode changes (flex-direction switches, grid column counts).

Reusable multi-property patterns live under `@layer components`, built from `@apply`'d utilities/theme tokens: `.chip`/`.chip--accent`, `.skill-bar__*`, `.career-layer__*`, `.career-focus__*`, `.stack-node__*`/`.stack-hub`, `.emwhit-bar`, and `.rich-text` (the shared markdown-body style for detail pages). One-off layout stays as Tailwind classes inline in the markup. A documented (comment-only — Tailwind can't enforce it) opacity convention sits at the top of the file: `/80` for body copy, `/60` for secondary text, `/50` for footer-only chrome; `/10` for structural borders, `/20` for interactive borders on dark backgrounds.

Classes toggled from JS (e.g. `text-paper`/`text-ink` in the nav invert) are picked up because Tailwind scans `src/motion/*.js` too — don't build class names by string concatenation or they won't be generated.

### The Career section: a GSAP-pinned "folder" (the centerpiece)

`src/components/Career.astro` + `src/motion/career.js` implement a pinned, scroll-scrubbed "tabbed folder" — four layers (Frontend/Backend/Data/Infra) that stack into accumulating tab headers as you scroll, above a `min-width: 880px` breakpoint (`DESKTOP_QUERY`). Below it, or with `prefers-reduced-motion`, the identical markup instead renders as plain stacked blocks in normal flow (`MOBILE_QUERY`) — there's no separate mobile markup, just different JS behavior applied to the same DOM.

Each layer's content is two columns: `CareerFocus.astro` on the left (a one-line lede, a row of `.chip` role tags, and a two-column archetype list, all from `src/data/career-focus.js`) and `SkillBars.astro` on the right (from `src/data/career-skills.js`). Layer 01 Frontend is the dark one (`--color-ink`, paper text); 02–04 are paper. That light/dark split is what the `accent` prop on both components selects between — it picks the paper-on-dark variants of `.chip`, the focus bullet, and the skill-bar track/fill.

**Overflow is contained to the skills column.** On desktop a layer is a fixed box (`inset: 0` inside the pinned folder), so tall content has to go somewhere: `.career-layer__body` is `overflow-hidden` and only `.career-layer__skills` scrolls, keeping the lede/archetypes/chips on the left put. Both that body and the skills column need `min-h-0` for it to work — a flex item *and* a grid item both floor at their content height by default, so without it the box grows past the layer instead of letting the column inside scroll. Below the breakpoint everything is `overflow: visible` in normal flow.

Things worth knowing before touching the motion file:
- Each layer is set to `position: absolute; inset: 0` (only in the desktop branch, via JS), which requires `[data-career-stack]` to have `position: relative`. Without it, the layers size themselves against the next positioned ancestor up the tree (`section`, much bigger) instead of the folder's own box — this has broken more than once; if the folder's content looks too wide or misaligned with the rest of the page, check this first.
- The pin's `start` reserves the fixed nav's *actual measured height* (`navEl.getBoundingClientRect().height`), not a hardcoded value — otherwise the first tab renders behind the nav.
- Per-layer skill-bar reveals are triggered via `tl.call()` at the same scroll positions driving the slide-in tweens — a plain auto-playing tween once fired, not scrubbed to scroll position. This went through several iterations (see the comments in the file): scrubbing the reveal directly let the tab-click handler's instant `scrollTo` jump freeze it mid-tween, and a two-phase lead-in/finish version created a visible stutter from chaining two eased tweens back-to-back.
- The **mobile** branch fades up `.career-focus > *` (the lede, archetype list, and chip row) — selecting the block children rather than just `<p>` is deliberate, so the bulleted list and chips animate in too.
- `LAYER_VH` / `TRANSITION_UNITS` control pacing and are intentionally decoupled — bumping `LAYER_VH` only adds hang time, since the slide-in duration no longer scales with it.

### The Stack section: a radial "wheel"

`src/components/Stack.astro` + `src/motion/stack.js` + `src/data/stack.js` render the "how I work" overview as a radial wheel — micro-stacks placed around a circle, with a monogram/headshot hub at the center and faint connector spokes. **Not a chart** (no quantitative encoding): node positions are plain trigonometry resolved at build time in the component, then ridden on `--x`/`--y` CSS custom properties. Above the `880px` breakpoint the nodes go `position: absolute` (via those custom properties); below it they're a plain vertical list. Node/hub/icon sizes use container-query units (`cqw`, via `@container` on `[data-stack-wheel]`) so the whole composition scales with the wheel's rendered diameter. The hub is hidden on mobile. `stack.js` is a one-shot reveal (opacity/stagger), not pinned — kept deliberately quick so a fast scroll can't outrun it.

### The PNW ("Life") section: a parallax peek

`src/components/Pnw.astro` (id `#life`) + `src/motion/pnw.js` are a `min-h-screen` flex column: a ~half-viewport b-roll photo "peek" at the top that pans slightly slower than the scroll (a subtle `yPercent` parallax on an oversized image, scrubbed), above a white content pane that fills the rest. The image is oversized (`h-[160%]`, pulled up with `top-[-30%]`) purely to give the pan headroom; `top` is a position offset, not a transform, so GSAP's `yPercent` owns the transform cleanly. (This section has been through pinned/two-photo-reveal and ScrollSmoother experiments on branches; the committed version is the simple peek.)

### Motion conventions

Every scroll-driven or load-time animation is guarded by `gsap.matchMedia()` against `(prefers-reduced-motion: no-preference)`, so content is visible by default and only the motion-safe branch ever sets a hidden starting state. Pin/scrub mechanics additionally gate on a width breakpoint (`min-width: 880px`) since they only make sense with more horizontal room.

`src/main.js` is the single entry point: it registers `ScrollTrigger` once and calls each section's own `init*()` function — no animation logic lives in components or `main.js` itself. Every `init*()` bails if its section isn't in the DOM, which is what makes the same bundle safe on detail pages (no hero, no career folder). `initHashSync()` must stay last — its deep-link jump reads pin positions the other inits create.

**Pinned layout vs. precomputed scroll ranges — the recurring trap**: a ScrollTrigger `start`/`end` is converted to fixed scroll-pixel values at refresh time, and the career/emwhit pins insert multi-viewport spacers that shift everything below them. Logic that needs "is X visually at/under Y right now" (the nav color invert in `emwhit.js`, the hash scrollspy in `hash-sync.js`) uses **IntersectionObserver** instead — it reads live rendered geometry and can't drift out of sync with pins. Several ScrollTrigger-range attempts at the nav invert failed before landing on this; don't reintroduce the pattern.

Section-specific notes:
- `nav.js` — swaps the fixed nav between transparent (over the hero) and opaque-scrolled styling; on pages with no hero (detail pages) it applies the scrolled treatment immediately.
- `emwhit.js` — the equalizer bars are scroll-driven sines whose phase advances at `BAR_SPEED` (0.7 = 30% slower than scroll). The section is exactly `h-screen` and pins flush at `top top` — the nav invert handles the overlap, so the pin must *not* reserve nav height. **This file also owns the nav color invert** (paper/ink on `[data-nav-invert]` elements): an IntersectionObserver watches every selector in `NAV_INVERT_REGIONS` (currently `[data-stack]` and `[data-emwhit]`, the dark-background sections) and inverts the nav text while it overlaps any of them. Add a dark region by adding its selector to that array.
- `hash-sync.js` — homepage-only (bails without `[data-hero]`). Scrollspy: the section crossing a line 30% down the viewport claims the hash via `history.replaceState` (no history spam); the hash is stripped at the top of the page; a bottom-of-page clamp credits the last short section on tall viewports. Deep links (`/#music`) re-scroll after `window` load — the browser's native jump happens before pin spacers exist, so it always lands wrong without this — putting pinned sections exactly at their pin start.
