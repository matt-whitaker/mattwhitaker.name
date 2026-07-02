# Bootstrap prompt — personal website

You are helping me build a single-page personal website. **The toolchain is already set up** and I've organized it the way I want — do not scaffold, reconfigure, or touch build tooling. Assume:

- Vite (multi-page not needed — this is one page)
- EJS for templating (I use EJS partials via Vite)
- Tailwind CSS v4 (CSS-first `@theme` config, not a `tailwind.config.js`)
- GSAP + ScrollTrigger available (assume installed; import from `gsap` and `gsap/ScrollTrigger`)

Your job is to fill in structure, markup, styles, and interaction — not to set up the environment. If you're unsure whether something exists, check the filesystem first rather than regenerating it.

## What this site is

A single-page, scroll-driven personal site for **Matt** — a senior frontend engineer (13+ years) who also runs a music project and builds side apps. Professional center of gravity, personal dimension layered in. Tone: confident, precise, a pulse of personality — never a resume recitation.

Build it as one page composed of EJS partials, one partial per section, assembled in the main template. Use semantic sectioning (`<section>` with `id`s) so the nav can anchor to each.

## Global conventions

- **Accent color:** pick a single restrained accent and define it as a Tailwind theme token (`--color-accent`). One accent for the whole site. I'll tune the exact hue later — use a deep blue placeholder for now.
- **Type:** one display/heading family, one body family. Use system/font fallbacks; I'll swap in real fonts later. Set them as theme tokens.
- **Motion is an enhancement, never a dependency.** Every section must be fully readable with JS disabled and with `prefers-reduced-motion: reduce`. Guard all GSAP with a reduced-motion check and a mobile breakpoint check via `gsap.matchMedia()`.
- **Images:** use Placekittens as stand-ins — format `https://www.placekittens.com/{w}/{h}` (e.g. `https://www.placekittens.com/200/300`). Use appropriately-sized dimensions per slot.
- **Filler text:** lorem ipsum is fine anywhere I haven't given real copy. Where I've given real framing below, use it.
- **Accessibility:** proper heading hierarchy, alt text on images, focus-visible states, nav landmarks. Respect reduced-motion everywhere.

## Sections (in order)

### 1. Nav (fixed, minimal)

A slim fixed nav pinned to the top. Anchor links: Intro · Career · Music · Projects · Contact. Five items max. The name/logo on the left scrolls to top. Keep it unobtrusive — this is a utility, not a hero element. It can subtly change appearance (background/border) once the user scrolls past the intro; if you add that, drive it with ScrollTrigger and keep it cheap.

### 2. Intro / hero (fullscreen splash)

Full viewport height. Room for a headshot (Placekitten, roughly square — `https://www.placekittens.com/400/400`), my name, a one-line positioning statement, and a short secondary line that hints at the fuller person. Two CTAs: a primary ("View my work" → scrolls to Career) and a secondary ("Get in touch" → scrolls to Contact).

Placeholder copy:
- Name: **Matt [Lastname]**
- Primary line: *Senior frontend engineer. Thirteen years turning complex interfaces into things that feel simple.*
- Secondary line: *Client-first React with a full-stack reach — and when I'm not building that, I'm writing music or over-engineering a homebrew app.*

Entry animation: a short, tasteful fade/slide-up of the hero content on load (not scroll-triggered). Keep it under ~400ms, reduced-motion disables it.

### 3. Career — the pinned "tabbed folder" stack (the centerpiece mechanic)

This is the most important section. Read carefully.

**Concept:** The career section presents four layers of a tech stack — **Frontend, Backend, Data, Infra** — as a real-life tabbed folder that assembles on scroll.

**Desktop behavior (enhancement):**
- When the section's top edge reaches the top of the viewport, the section **pins**.
- While pinned, continued scrolling advances an internal progress value (scrubbed), it does not move the page.
- Each layer slides up and **locks under the previous layer's tab**, accumulating a stack of header tabs at the top, exactly like manila folder tabs.
- **Frontend is the "fat" layer** — it gets the most scroll-distance and the richest open state. The other three (Backend, Data, Infra) are leaner. This size difference *is* the depth-vs-breadth argument: frontend is deep, the three beneath it are the breadth.
- Once the fourth layer locks, the section **unpins** and normal scrolling resumes — the fully-assembled folder scrolls away as a single unit. The release must feel seamless, not lurchy.
- The accumulated tabs are **clickable during the pin** — clicking a tab jumps to that layer (and serves as the skip affordance so users aren't trapped).
- Implement with GSAP ScrollTrigger pin + scrub. Allocate roughly one viewport-height of scroll per layer, with frontend getting more. Set `end` and pin-spacing so the unpin is clean. Test math for both trackpad and wheel deltas (comment where the tuning knobs are).

**Mobile / reduced-motion behavior (baseline):**
- **Drop the pin and scrub entirely.** Render the four layers as plain stacked blocks that scroll normally. Same markup, same order, same content, same fat-frontend emphasis — just no pinning.
- Use `gsap.matchMedia()` so the pin is registered only above a tablet-ish breakpoint and GSAP cleans it up on resize/rotate. Pick the breakpoint where the pinned layout starts to feel cramped rather than a stock value.

**Visual hierarchy:**
- Frontend = accented (use the site accent color), largest, richest content.
- Backend / Data / Infra = neutral/monochrome, leaner, visually a single group.
- A framing line ties the lower three together as "the breadth" — e.g. a short label like *"and the reach beneath it"* — so a visitor doesn't read four equal topics.

**Layer content** (real framing, expand with filler as needed):
- **Frontend — "Where I go deep":** Ten years in React. Reactive patterns (RxJS), framework-neutral domain state, design systems, micro-frontends. Raw JS/HTML/CSS as first principles. Performance, accessibility, i18n. Chips: React, RxJS, TypeScript, performance, a11y / i18n.
- **Backend:** Services in C#/.NET, Java Spring Boot, Node, Python Flask. Chips: .NET, Spring Boot, Node, Flask.
- **Data:** SQL and NoSQL — Postgres, MySQL, SQL Server; Mongo, DynamoDB, Cassandra. Chips: Postgres, DynamoDB, Cassandra.
- **Infra:** Most useful at the edge layer — orchestration, the API contract, the seams where systems meet. Comfortable designing systems beyond where I'm hands-on. Chips: K8s, edge layer, system design.

**Availability beat** closes the section: a single calm line + a CTA. Placeholder: *Open to senior frontend contract work — fully remote, or onsite/hybrid on the Seattle Eastside. W2, defined scope preferred.* CTA: "Let's talk" → Contact.

Build the folder as a self-contained, well-commented component so I can tune proportions and scroll-distance easily. Isolate the ScrollTrigger setup in its own module.

### 4. The Emwhit Project — first-class, atmospheric

A full-weight section (parallel in importance to Career), for my music project **The Emwhit Project** — an independent solo rock project. This section can carry more atmosphere and is where the one deliberate "rock" accent lives, without threatening the professional tone elsewhere.

**Bespoke mechanic:** a **bar of music (equalizer-style vertical bars) across the top of the section that "dances" attached to scroll** — bar heights driven by scroll progress through the section, not by audio. Simple, not fancy, but bespoke. Reduced-motion: render the bars static at varied heights. Keep it cheap (transform/scaleY only, no layout thrash).

Include: an album-art placeholder (`https://www.placekittens.com/500/500`), a short first-person blurb about the project (lorem ok), and outbound links (Spotify, Bandcamp, YouTube, etc. — use `#` placeholders). Nod visually to the "projects/cards" theme so it connects to the next section.

### 5. Projects — extensible tileable card grid

A responsive card grid. **The card is a component built once; adding a project later is a data edit, not a layout change.** Drive the grid from a small data array (title, blurb, tags[], href, thumbnail). Render by mapping over the array in EJS.

- Layout: 3-up desktop, 2-up tablet, 1-up mobile (Tailwind responsive).
- Every card is **uniform** — same shape regardless of content: thumbnail (Placekitten `https://www.placekittens.com/600/400`), title, one-line blurb, a tag or two, and the **whole card is one click target** (wrap in a single link/clickable surface — do not commit to a small "read more" link, I want to keep the click behavior swappable later).
- Seed with **two real entries** so the grid doesn't look empty:
  1. **Brewdocs** — a homebrewing app I built (tags: personal app, engineering).
  2. **The Emwhit Project site** — the music site I built on AWS: S3/CloudFront with OAC, GitHub Actions CI/CD, a contact form via API Gateway/Lambda/SES with Cloudflare Turnstile (tags: AWS, CI/CD, serverless).
- Add one or two lorem-filler cards so the 3-up grid reads full.
- Card entry animation: a light staggered fade/slide-up as cards enter viewport (ScrollTrigger batch). Reduced-motion disables it.

### 6. Social wrap-up + footer

A closing "social" band — a compact linktree-style set of links (Instagram, X, TikTok, YouTube, Bandcamp, Threads — `#` placeholders) — then a proper footer (name, copyright, a small "built with" line is fine). This is also where the Contact anchor lives; a simple contact prompt/CTA is enough (I'll wire the actual form myself).

## Deliverables

- EJS partials, one per section, assembled in the main page template.
- A Tailwind v4 `@theme` block defining accent + type tokens.
- A JS entry that imports GSAP, registers ScrollTrigger, and wires each section's mechanic — each mechanic in its own well-commented module, all guarded by `gsap.matchMedia()` and reduced-motion checks.
- Sensible, minimal CSS beyond Tailwind utilities only where a mechanic needs it (the folder, the equalizer bars).

## Constraints / reminders

- Don't touch build config or reinstall tooling.
- Motion is progressive enhancement — the site works fully without it.
- Everything readable and navigable on mobile; the Career pin is desktop-only.
- Keep the ScrollTrigger tuning knobs (scroll-distance per layer, breakpoint, ease) obvious and commented so I can adjust.
- Placekittens for all images, lorem ipsum for filler copy, real framing where I gave it.
- Ask me before introducing any new dependency.

Start by laying out the partial/module file structure you intend to create and a one-line plan per section, then build. Work section by section; don't try to emit everything in one pass.