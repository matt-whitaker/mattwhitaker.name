---
title: Brandfluence Demo
blurb: Prototype mobile marketing product for early attempt start-up, Brandfluence
tags:
  - React
href: https://bfaero.mattwhitaker.name
hrefLabel: "View demo"
thumbnail: /images/bfaero.png
alt: "The Brandfluence demo's opening screen: three friends carrying a canoe, headlined \"Hey Bestie, Time to Show Off Your New Look!\" above a Submit your photo button"
noindex: true
---

Built a prototype mobile webapp for a small, prospective AI-scene startup. Working with their temporary designer, rapidly
prototyped and built this little mobile-focused application, the purpose of which was to facilitate the submission of
Instagram posts which contained Aeropostale products for possible coupon code awards.

The app is a simple workflow, with most of the focus on branding and flash, to allow a user to submit an Instagram post,
receive a coupon code (driven by AI analysis), and have it sent to their email address.

The brief was a pitch, not a production system — the goal was a working demo that could sell the concept to prospective
partners and investors, not a hardened backend. That reshaped the priorities: interaction fidelity and visual polish had
to carry the weight that a real integration would normally carry, since there was no live Instagram or Aeropostale
integration behind it to lean on. Everything the app appears to do — validating a post, running it through "AI analysis,"
issuing a coupon code, sending it to an inbox — is simulated for the demo rather than wired to anything real, which is
also why the demo mode is safe to click through freely.

Built with React, the whole thing is intentionally narrow in scope: one screen flow, a handful of states, and a lot of
attention on making that flow feel finished. Working directly with the startup's temporary designer meant translating
a visual identity into a real, tappable interface fast, under startup timelines rather than the longer review cycles
of a settled product team. That's the part of this project I'd call the actual work: not the AI gimmick, but taking a
loose brand direction and turning it into something a prospective backer could hold in their hand and believe in within
a day or two of design work landing.

If you want to demo it, click the button below. This version is a demo, so nothing is actually sent anywhere. For the
Instagram URL, just use <input style="width: 13rem; text-align: center;" value="https://instagram.com/p/test" />.

**Best viewed on mobile, app is width-pinned on desktop**