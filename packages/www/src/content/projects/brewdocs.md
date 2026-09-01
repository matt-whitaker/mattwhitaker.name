---
title: BrewDocs
blurb: A digital handbook, toolkit, and brew day application for homebrewers.
tags:
  - React
  - Tanstack
  - Daisy UI
  - Tailwind
  - Astro
href: https://brewdocs.beer
thumbnail: /images/brewdocs.png
alt: The BrewDocs wordmark in black on a slate blue background
---

BrewDocs is a side project that combines two things I like doing: writing software and brewing
beer. It's a digital handbook, toolkit, and brew day application for homebrewers, built to give
the process a single home instead of the scattered notebooks, spreadsheets, and forum threads
most homebrewers end up piecing together their process from. It's still in progress, but deployed
and live as a working demo rather than sitting unpublished on a branch.

The three pieces in the blurb map to three different jobs. The handbook side is reference
material — the process knowledge a brewer leans on. The toolkit is the calculators and utilities
that turn raw numbers into decisions. And the brew day application is the part meant to be open
and in front of you while you're actually brewing, not just planning to.

The stack reflects that split. Astro handles the static shell — fast to load, cheap to host, no
framework overhead for content that doesn't need to be interactive. React and TanStack power the
actual application surface, where state, data-fetching, and interactivity matter. DaisyUI on top
of Tailwind gives the interactive parts a consistent, ready-made component layer, so the effort
goes into the brewing logic instead of rebuilding buttons and form controls from scratch.

That combination is also deliberate as a learning exercise, not just an implementation choice.
BrewDocs is where I get to try tools and patterns I don't necessarily reach for at work, in a
project with real constraints and a real end user — me, on brew day — rather than a synthetic
tutorial. It's a genuinely useful tool for my own homebrewing wrapped around an ongoing excuse to
keep sharpening the stack I build it with.