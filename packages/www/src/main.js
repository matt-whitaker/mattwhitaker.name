import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

import { initNav } from './motion/nav.js';
import { initHero } from './motion/hero.js';
import { initStack } from './motion/stack.js';
import { initCareer } from './motion/career.js';
import { initPnw } from './motion/pnw.js';
import { initEmwhit } from './motion/emwhit.js';
import { initProjects } from './motion/projects.js';
import { initArchives } from './motion/archive.js';
import { initContactCopy } from './motion/contact.js';
import { initHashSync } from './motion/hash-sync.js';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Site-wide smooth scrolling. Created before the section inits so their
// pinned ScrollTriggers register against the smoother's proxied scroll.
// Gated on the wrapper existing and motion being allowed — reduced-motion
// users keep native scroll (hijacked scroll is an a11y concern), and the
// `effects` flag enables data-speed/data-lag parallax if we want it.
if (
  document.getElementById('smooth-wrapper') &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches
) {
  ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 0.6,
    effects: true,
    smoothTouch: false, // native scroll on touch devices — the smoothing felt off on mobile
  });
}

initNav();
initHero();
initStack();
initCareer();
initPnw();
initEmwhit();
initProjects();
initArchives();
initContactCopy();
// Last: its deep-link jump reads pin positions the inits above create.
initHashSync();
