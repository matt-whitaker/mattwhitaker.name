import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initNav } from './motion/nav.js';
import { initHero } from './motion/hero.js';
import { initCareer } from './motion/career.js';
import { initEmwhit } from './motion/emwhit.js';
import { initProjects } from './motion/projects.js';
import { initCaseStudies } from './motion/case-studies.js';
import { initContactCopy } from './motion/contact.js';
import { initHashSync } from './motion/hash-sync.js';

gsap.registerPlugin(ScrollTrigger);

initNav();
initHero();
initCareer();
initEmwhit();
// initCaseStudies();
initProjects();
initContactCopy();
// Last: its deep-link jump reads pin positions the inits above create.
initHashSync();
