---
title: Pay-i.com
blurb: A heavily animated, parallaxing landing page for Pay-i.
tags:
  - Parallax
  - Tailwind
  - GSAP
href: https://web.archive.org/web/20250522002340/https://pay-i.com/
hrefLabel: View on Wayback
thumbnail: /images/pay-i-wayback-screenshot.png
alt: "The Pay-i landing page: the headline \"Transform GenAI Spend to Business Value\" above a screenshot of the product's spend dashboard"
noindex: true
---

At Pay-i I built the company's landing page from scratch. The product is spend management for generative AI (turning GenAI spend into business value, per the page's own headline), and the page had to make that pitch in the first few seconds of a scroll.

The design was a heavily animated, presentation-style parallax page: nearly every section pinned, transitioning, or otherwise moving as you scroll. I worked closely with the designer on the corner cases and on what all of that motion should do on a phone.

I'd never built a page like this, the design kept shifting, and the timeline was short. AI tools weren't much help yet, so most of it was trial and error: build, scroll, adjust, repeat. The MVP shipped in a little under two weeks, which I was pretty happy with.

The stack was Tailwind for styling and GSAP for the animation and scroll orchestration, the same combination behind the motion on this site. GSAP's timelines and ScrollTrigger make it practical to choreograph pinning and scrubbed transitions without hand-rolling scroll math. No single effect was that hard. The hard part was keeping the whole page coherent: transitions that read at any scroll speed, and a mobile version that feels intentional rather than like the desktop site with the good parts removed.

The site isn't live anymore, so here's a Wayback Machine snapshot.