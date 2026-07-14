---
title: Brewdocs
blurb: A digital handbook, toolkit, and brew day application for homebrewers.
tags:
  - React
  - Tanstack
  - Daisy UI
  - Tailwind
href: https://brewdocs.beer
thumbnail: /images/brewdocs.png
---

BrewDocs began as a way to combine two things I care about: homebrewing and software engineering. It's built for amateur homebrewers who want something approachable, a tool that works as both a knowledge base and an easy note-taking app, with a design focused on making real-time input and information lookup as frictionless as possible. Rather than chasing the complex, advanced feature sets other products offer, BrewDocs deliberately keeps things simple, and over time it will grow into a more guided brewing experience. It's also fully offline-compatible, so an internet connection is never a requirement for use.

The project, currently in progress, started life on Next.js, partly because I wanted a platform for learning a new technology and thought I could lean on its multipage support to handle the load optimizations I knew the app would eventually need. Over time, though, the goal of learning Next.js began to collide with the question of what was actually the right tool for the job. In the end, a pure single-page application won out, leveraging the also modern Tanstack suite. Migrating there gave me a chance to put Claude Fable through its paces on a fairly opaque migration, which it handled seamlessly.

Under the hood, BrewDocs is a monorepo split into packages organized around domain slices of the product. A central design package expresses the shared design system (currently standing in with DaisyUI) so that the marketing site and the application stay visually consistent. The knowledge base gets its own dedicated package, one of the more distinctive parts of the project, so its content can be optimized for both S3 storage and access and local caching. Keeping it separate also means the knowledge base can be updated independently of any individual user, allowing for graceful migration when data structures change.

If you're a fellow homebrewer, I'd love to hear from you. BrewDocs is still taking shape, and suggestions from people who actually spend time brewing are exactly what will help it grow in the right direction. Whether it's a feature you wish existed, a workflow that would make brew day easier, or just an idea worth exploring, feel free to reach out.