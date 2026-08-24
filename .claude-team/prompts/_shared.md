# mattwhitaker.name

A monorepo of static personal sites. **`packages/www` is the surface under active development**:
a single-page, scroll-driven Astro site (Tailwind v4, GSAP/ScrollTrigger) with per-project and
per-archive detail pages. Static output only — no SSR, no client framework islands. GSAP does all
client-side work through plain bundled scripts.

Unless an issue says otherwise, every path you are given is relative to `packages/www`.

## The gate

```
npm ci && npm run build:www
```

Run it from the repo root. Both CI workflows pin **Node 24** (`NODE_VERSION: 24`).

⚠️ **`CLAUDE.md`'s Node guidance is stale — do not follow it.** It cites an `.nvmrc` pinning
`18.18.2` and tells you to use Node 20. There is no `.nvmrc` anywhere in the repo, and CI uses 24.
This file is correct; report the contradiction rather than acting on it.

⚠️ **`npm run build` at the root is not this command.** It fans out over workspaces
(`-ws --if-present`), and only `packages/www` is a workspace — `blog`, `core` and `assets` are
not, and are not wired into the root build. `build:www` is what CI runs.

⚠️ **There is no test suite and no linter.** The `Test` job in `build-test.yaml` echoes
*"No tests yet..."* and passes unconditionally. A green CI run means the site built and nothing
more — so report that the **build** passed, never that tests did.

**Reading the gate.** It fails hard and honestly: a non-zero exit with a stack trace. A clean exit
is a real pass, not a log-and-continue. Two classes of error that look like runtime concerns are
in fact build failures:

- **Every `simple-icons:<slug>` name is resolved at build time.** A wrong slug fails the build
  rather than dropping a glyph. Verify one against `simple-icons/simple-icons/develop/slugs.md`
  before wiring it — several brands people assume exist do not (Emotion, for one).
- **Every Projects/Archives entry's frontmatter is validated** against the shared zod schema in
  `src/content.config.ts`: `title`, `blurb`, `tags[]`, `href` (must parse as a URL), `thumbnail`,
  and optional `hrefLabel`.

⚠️ **The gate cannot see the thing this repo is actually for.** Nothing here checks that a page
still *looks* right, and the site is almost entirely motion and layout. A change that builds
clean can still be visibly broken, and you have no browser. When your change is visual, say so
plainly in your report and name what a human should look at — do not describe a passing build as
if it verified appearance.

⚠️ **Do not try to verify through `npm run dev`.** Adding or removing an import while the dev
server runs leaves Vite serving stale optimized-dependency URLs; the whole `main.js` chain dies
silently and the only symptom is the hero stuck at `opacity: 0`. Build to check code.

## Invariants — things that break without failing the gate

Every item here survives `npm run build:www`. That is why they are listed.

**Motion and layout**

- **The anti-flash script in `src/layouts/Layout.astro` must stay `is:inline`.** It adds
  `.js-motion` to `<html>` before first paint so CSS can pre-hide the hero
  (`.js-motion [data-hero-item]` in `style.css`). Bundled or deferred, the hero visibly flashes.
  Its values must stay in sync with the `gsap.to()` call in `src/motion/hero.js`.
- **`[data-career-stack]` must keep `relative`.** The desktop branch of `career.js` sets each
  layer `position: absolute; inset: 0`; without a positioned ancestor the layers size against the
  `section` instead of the folder. Broken repeatedly. If the folder looks too wide or misaligned,
  check this first.
- **`initHashSync()` stays last in `src/main.js`.** Its deep-link jump reads pin positions the
  other `init*()` calls create.
- **The career pin reserves the nav's *measured* height** (`getBoundingClientRect().height`), never
  a constant. **The emwhit pin must not reserve it** — that section is exactly `h-screen` and pins
  flush at `top top`; the nav invert handles the overlap.
- **"Is X visually under Y right now" is an IntersectionObserver question, never a ScrollTrigger
  range.** `start`/`end` resolve to fixed scroll pixels at refresh, and the career/emwhit pins
  insert multi-viewport spacers that shift everything below. The nav invert (`emwhit.js`) and the
  scrollspy (`hash-sync.js`) use IntersectionObserver for exactly this reason. Several
  ScrollTrigger attempts at the nav invert failed before this; do not reintroduce the pattern.
- **Every scroll or load animation is guarded by `gsap.matchMedia()` against
  `(prefers-reduced-motion: no-preference)`**, so content is visible by default and only the
  motion-safe branch sets a hidden starting state. Pin/scrub mechanics additionally gate on
  `min-width: 880px`. New motion follows both.
- **The dark-background regions that invert the nav are the `NAV_INVERT_REGIONS` array in
  `emwhit.js`.** A new dark section is added by adding its selector there — nothing else.

**Content and styling**

- **Adding a project or an archive is dropping a `.md` file into `src/content/`, never a markup
  change.** Both grids render through `ContentCard.astro`.
- **Tailwind class names toggled from JS must be literal strings.** Tailwind scans
  `src/motion/*.js`; a name built by concatenation is never generated.
- **`--color-accent` is the single theme lever.** `--color-accent-soft` and `--color-paper` derive
  from it through `color-mix()`. Do not hardcode either — changing the site's whole look is meant
  to stay a one-line edit.
- **Prefer the fluid root lever over new breakpoint variants.** `html { font-size: clamp(...) }`
  scales the whole rem-based scale with viewport width. Breakpoints are for genuine layout-mode
  changes (flex direction, column counts), not for size growth.
- **The opacity convention** (documented at the top of `style.css`, unenforceable by Tailwind):
  `/80` body copy, `/60` secondary text, `/50` footer chrome; `/10` structural borders, `/20`
  interactive borders on dark backgrounds.
- **Nav links stay root-relative** (`/#career`, not `#career`) so they work from detail pages.
- **The sitemap is generated** by `@astrojs/sitemap` as `sitemap-index.xml`. Never hand-maintain
  `public/sitemap.xml`.
- **"Archives" was never "Case Studies".** That rename is complete; do not reintroduce the old
  naming or the bodyless-YAML shape it used.

**Comments.** This repo defaults to *no* comments. One earns its place only by capturing what the
code cannot: a top-level export's contract, a timing dependency, a workaround, an invariant not
visible from the surrounding code. Do not narrate steps, restate a well-named function, or leave
changelog notes about what used to be there.

## Boundaries

- **`packages/blog`, `packages/core` and `packages/assets` are not yours to lead on.** They are
  outside the documented architecture and outside the root build. If work reaches them, say so and
  stop at the boundary.
- **`emwhitproject.com` is a separate repository.** The Emwhit section here only links to it.
  Product work on it goes there, not into this repo.
- **`mainline` deploys.** Merging to it ships to S3/CloudFront.
- **`CLAUDE.md` is the maintainer's file, not a role's deliverable.** You may — and should —
  report where it has drifted from the code, with the correction you would make, under
  🔔 Maintainer. Do not rewrite it as part of a task.
